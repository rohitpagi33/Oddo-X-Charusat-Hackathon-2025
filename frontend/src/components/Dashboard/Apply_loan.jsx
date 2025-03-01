import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ApplyLoanPage() {
  // Form state
  const [loanType, setLoanType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState(24);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [documents, setDocuments] = useState([]); // New state for files
  const [loading, setLoading] = useState(false);

  // Handle file input change
  const handleFileChange = (e) => {
    setDocuments([...e.target.files]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData object to handle file uploads
    const formData = new FormData();
    formData.append("loanType", loanType);
    formData.append("loanAmount", loanAmount);
    formData.append("loanTenure", loanTenure);
    formData.append("monthlyIncome", monthlyIncome);
    formData.append("employmentType", employmentType);
    
    // Append each file to FormData
    documents.forEach((file) => {
      formData.append("documents", file);
    });

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/loans/apply-loan`, {
        method: "POST",
        body: formData, // Use FormData instead of JSON
        // Note: Don't set Content-Type header manually when using FormData
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        console.error("Error submitting form:", data.error);
        alert("Error submitting application. Please try again.");
      } else {
        console.log("Form submitted successfully:", data);
        alert("Application and documents submitted successfully!");
        // Reset form fields after submission
        setLoanType("");
        setLoanAmount("");
        setLoanTenure(24);
        setMonthlyIncome("");
        setEmploymentType("");
        setDocuments([]);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Error submitting application. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Apply for a Loan</h1>
      <p className="text-muted">Fill out the form below to apply for a loan.</p>

      <div className="card">
        <div className="card-header">
          <h5>Loan Application</h5>
          <p className="text-muted">Provide your details and documents to get started.</p>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Loan Type */}
            <div className="mb-3">
              <label className="form-label">Loan Type</label>
              <select
                className="form-select"
                value={loanType}
                onChange={(e) => setLoanType(e.target.value)}
                required
              >
                <option value="">Select loan type</option>
                <option value="personal">Personal Loan</option>
                <option value="business">Business Loan</option>
                <option value="education">Education Loan</option>
                <option value="home">Home Loan</option>
              </select>
            </div>

            {/* Loan Amount */}
            <div className="mb-3">
              <label className="form-label">Loan Amount (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter loan amount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                required
              />
            </div>

            {/* Loan Tenure */}
            <div className="mb-3">
              <label className="form-label">Loan Tenure (months)</label>
              <input
                type="range"
                className="form-range"
                min="12"
                max="60"
                step="1"
                value={loanTenure}
                onChange={(e) => setLoanTenure(e.target.value)}
              />
              <div className="d-flex justify-content-between text-muted">
                <span>12 months</span>
                <span>{loanTenure} months</span>
                <span>60 months</span>
              </div>
            </div>

            {/* Monthly Income */}
            <div className="mb-3">
              <label className="form-label">Monthly Income (₹)</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your monthly income"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                required
              />
            </div>

            {/* Employment Type */}
            <div className="mb-3">
              <label className="form-label">Employment Type</label>
              <select
                className="form-select"
                value={employmentType}
                onChange={(e) => setEmploymentType(e.target.value)}
                required
              >
                <option value="">Select employment type</option>
                <option value="salaried">Salaried</option>
                <option value="self-employed">Self Employed</option>
                <option value="business">Business Owner</option>
              </select>
            </div>

            {/* Document Upload */}
            <div className="mb-3">
              <label className="form-label">Upload Documents</label>
              <input
                type="file"
                className="form-control"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                required
              />
              <small className="form-text text-muted">
                Accepted formats: PDF, JPG, PNG. Upload all required documents (ID proof, income proof, etc.)
              </small>
              {documents.length > 0 && (
                <div className="mt-2">
                  <p>Selected files:</p>
                  <ul>
                    {documents.map((file, index) => (
                      <li key={index}>{file.name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}