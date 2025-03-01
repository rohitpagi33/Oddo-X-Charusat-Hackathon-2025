import React from "react";
import { Button, Table } from "react-bootstrap";

const LoanDetails = ({ loan, onBack }) => {
  if (!loan) {
    return <p className="text-center text-danger">No loan selected.</p>;
  }

  return (
    <div className="container-md p-5 text-white" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <h2 className="mb-4">Loan Application Details</h2>

      <Table striped bordered hover variant="dark">
        <tbody>
          <tr><th>Loan ID</th><td>{loan.id}</td></tr>
          <tr><th>Loan Type</th><td>{loan.loan_type}</td></tr>
          <tr><th>Loan Amount</th><td>₹{loan.loan_amount}</td></tr>
          <tr><th>Loan Tenure</th><td>{loan.loan_tenure} months</td></tr>
          <tr><th>Monthly Income</th><td>₹{loan.monthly_income}</td></tr>
          <tr><th>Employment Type</th><td>{loan.employment_type}</td></tr>
          <tr><th>Application Date</th><td>{new Date(loan.created_at).toLocaleDateString()}</td></tr>
          <tr>
            <th>Status</th>
            <td>
              <span className={`badge bg-${loan.status === "Approved" ? "success" : loan.status === "Rejected" ? "danger" : "secondary"}`}>
                {loan.status || "Pending"}
              </span>
            </td>
          </tr>
        </tbody>
      </Table>

      <Button variant="light" onClick={onBack}>Back to List</Button>
    </div>
  );
};

export default LoanDetails;
