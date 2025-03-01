import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignaturePad from "./Signature";

export default function ApplyLoanPage() {
  // Form state
  const [loanType, setLoanType] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loanTenure, setLoanTenure] = useState(24);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/loans/apply-loan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        loanType,
        loanAmount,
        loanTenure,
        monthlyIncome,
        employmentType,
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      console.error("Error submitting form:", data.error);
      alert("Error submitting application. Please try again.");
    } else {
      console.log("Form submitted successfully:", data);
      alert("Application submitted successfully!");
      // Reset form fields after submission
      setLoanType("");
      setLoanAmount("");
      setLoanTenure(24);
      setMonthlyIncome("");
      setEmploymentType("");
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Apply for a Loan</h1>
      <p className="text-muted">Fill out the form below to apply for a loan.</p>

      <div className="card">
        <div className="card-header">
          <h5>Loan Application</h5>
          <p className="text-muted">Provide your details to get started.</p>
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

            <SignaturePad />

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Submitting..." : "Continue to Document Upload"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}