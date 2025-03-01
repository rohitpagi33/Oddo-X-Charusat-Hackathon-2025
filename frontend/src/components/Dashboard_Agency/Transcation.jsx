import React from "react";
import { Table, Button, Form } from "react-bootstrap";

const Transactions = () => {
  const transactions = [
    { id: "TXN001", date: "2024-02-15", borrower: "Rahul Kumar", type: "Disbursement", amount: "₹50,000", status: "Success" },
    { id: "TXN002", date: "2024-02-15", borrower: "Priya Singh", type: "EMI Payment", amount: "₹5,000", status: "Success" },
    { id: "TXN003", date: "2024-02-14", borrower: "Amit Patel", type: "EMI Payment", amount: "₹7,500", status: "Pending" },
    { id: "TXN004", date: "2024-02-14", borrower: "Sneha Gupta", type: "Disbursement", amount: "₹75,000", status: "Success" },
    { id: "TXN005", date: "2024-02-13", borrower: "Rajesh Sharma", type: "EMI Payment", amount: "₹10,000", status: "Failed" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Success":
        return "badge bg-success";
      case "Pending":
        return "badge bg-warning text-dark";
      case "Failed":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  const getTypeBadge = (type) => {
    return type === "Disbursement" ? "badge bg-light text-dark" : "badge bg-dark";
  };

  return (
    <div className="container mt-4">
      <h3 className="text-white">Transactions</h3>
      <p className="text-secondary">View and manage all loan disbursements and EMI payments</p>

      {/* Search & Filter */}
      <div className="d-flex justify-content-between mb-3">
        <Form.Control type="text" placeholder="Search transactions..." className="w-50" />
        <div>
          <Form.Select className="me-2 d-inline w-auto">
            <option>All Transactions</option>
            <option>Disbursements</option>
            <option>EMI Payments</option>
          </Form.Select>
          <Button variant="outline-light">
            <i className="bi bi-download"></i> Export
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Borrower</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{txn.date}</td>
              <td>{txn.borrower}</td>
              <td>
                <span className={getTypeBadge(txn.type)}>{txn.type}</span>
              </td>
              <td>{txn.amount}</td>
              <td>
                <span className={getStatusBadge(txn.status)}>{txn.status}</span>
              </td>
              <td>
                <Button variant="outline-light" size="sm">
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Transactions;
