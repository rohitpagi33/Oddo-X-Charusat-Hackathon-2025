import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import SignaturePad from "./components/Dashboard/Signature.jsx";
import DocumentUpload from "./components/Dashboard/Document.jsx";
import { useLocation } from "react-router-dom";
// import ProductList from "./ProductList.jsx"; // Since `Apply_loan_via.jsx` is inside `src/components/dashboard/`


export default function ApplyLoanVia() {
  const location = useLocation();
  const productPrice = location.state?.price || ""; // Get price from navigation state

  // Form state
  const [purchaseType] = useState("Product Purchase"); // Fixed
  const [loanType] = useState("MicroFin Loan"); // Fixed
  const [loanAmount, setLoanAmount] = useState(productPrice);
  const [loanTenure, setLoanTenure] = useState(24);
  const [monthlyIncome, setMonthlyIncome] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("User not logged in. Please log in first.");
      setLoading(false);
      return;
    }

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/loans/apply-loan`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        purchaseType,
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
      alert("Error submitting application. Please try again.");
    } else {
      alert("Application submitted successfully!");
      window.location.href = "/dashboard_user";
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Apply for a Loan</h1>
      <div className="card">
        <div className="card-header">
          <h5>Loan Application</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Purchase Type</label>
              <input type="text" className="form-control" value={purchaseType} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Loan Type</label>
              <input type="text" className="form-control" value={loanType} disabled />
            </div>

            <div className="mb-3">
              <label className="form-label">Loan Amount (₹)</label>
              <input type="number" className="form-control" value={loanAmount} readOnly />
            </div>

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
            </div>

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

            <DocumentUpload />
            <SignaturePad />

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Submitting..." : "Continue to Document Upload"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Product List Page
import { useNavigate } from "react-router-dom";

export function ProductList() {
  const navigate = useNavigate();
  const products = [
    { id: 1, name: "Smartphone", price: 20000 },
    { id: 2, name: "Laptop", price: 50000 },
    { id: 3, name: "Washing Machine", price: 30000 },
    { id: 4, name: "TV", price: 40000 },
    { id: 5, name: "Refrigerator", price: 35000 },
  ];

  return (
    <div className="container mt-5">
      <h1>Choose a Product</h1>
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">Price: ₹{product.price}</p>
                <button
                  className="btn btn-success"
                  onClick={() => navigate("/apply-loan-via", { state: { price: product.price } })}
                >
                  Buy with MicroFin
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
