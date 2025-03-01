import React from "react";
import { Table, Button } from "react-bootstrap";
import { ArrowUpRight, Download } from "lucide-react";

export default function EMI_Schedual() {
  return (
    <div className="container mt-4">
      <div>
        <h1 className="h3 fw-bold">EMI Tracker</h1>
        <p className="text-muted">Track and manage your loan EMIs.</p>
      </div>

      <div className="card shadow-sm">
        <div className="card-header">
          <h5 className="card-title mb-0">EMI Schedule</h5>
          <p className="text-muted small">Your upcoming and past EMI payments</p>
        </div>
        <div className="card-body">
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Due Date</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {emiSchedule.map((emi, index) => (
                <tr key={index}>
                  <td>{emi.dueDate}</td>
                  <td>₹{emi.amount}</td>
                  <td>
                    <span
                      className={`badge px-2 py-1 ${emi.status === "Paid" ? "bg-success" : "bg-warning text-dark"}`}
                    >
                      {emi.status}
                    </span>
                  </td>
                  <td>
                    {emi.status === "Pending" && (
                      <Button variant="primary" size="sm">
                        Pay Now <ArrowUpRight className="ms-2" size={16} />
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <Button variant="outline-secondary">
          <Download className="me-2" size={16} /> Download EMI Statement
        </Button>
      </div>
    </div>
  );
}

const emiSchedule = [
  { dueDate: "15 Feb 2024", amount: "12,500", status: "Pending" },
  { dueDate: "15 Jan 2024", amount: "12,500", status: "Paid" },
  { dueDate: "15 Dec 2023", amount: "12,500", status: "Paid" },
  { dueDate: "15 Nov 2023", amount: "12,500", status: "Paid" },
  { dueDate: "15 Oct 2023", amount: "12,500", status: "Paid" },
];
