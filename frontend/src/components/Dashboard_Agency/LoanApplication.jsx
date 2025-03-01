import React, { useState } from "react";
import { Table, Button, Form, InputGroup } from "react-bootstrap";

const LoanApplications = () => {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([
    { id: "APP001", name: "Rahul Kumar", type: "Personal Loan", amount: "₹50,000", cibil: 750, status: "Pending" },
    { id: "APP002", name: "Priya Singh", type: "Business Loan", amount: "₹2,00,000", cibil: 820, status: "Approved" },
    { id: "APP003", name: "Amit Patel", type: "Education Loan", amount: "₹1,50,000", cibil: 680, status: "Rejected" },
    { id: "APP004", name: "Sneha Gupta", type: "Personal Loan", amount: "₹75,000", cibil: 710, status: "Pending" },
    { id: "APP005", name: "Rajesh Sharma", type: "Business Loan", amount: "₹3,00,000", cibil: 790, status: "Approved" },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setApplications(
      applications.map(app => app.id === id ? { ...app, status: newStatus } : app)
    );
  };

  return (
    <div className="p-4"  style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <h2 className="text-white">Loan Applications</h2>
      <p className="text-muted">Manage and review all loan applications</p>
      
      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search applications..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>
      
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Application ID</th>
            <th>Applicant Name</th>
            <th>Loan Type</th>
            <th>Amount</th>
            <th>CIBIL Score</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.filter(app =>
            app.name.toLowerCase().includes(search.toLowerCase()) ||
            app.id.toLowerCase().includes(search.toLowerCase())
          ).map((app) => (
            <tr key={app.id}>
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td>{app.type}</td>
              <td>{app.amount}</td>
              <td>{app.cibil}</td>
              <td>
                <span 
                  className={`badge bg-${app.status === "Approved" ? "success" : app.status === "Rejected" ? "danger" : "secondary"}`}
                >
                  {app.status}
                </span>
              </td>
              <td>
                <Button variant="light" size="sm" className="me-2">View</Button>
                {app.status === "Pending" && (
                  <>
                    <Button variant="success" size="sm" className="me-2" onClick={() => handleStatusChange(app.id, "Approved")}>
                      Approve
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleStatusChange(app.id, "Rejected")}>
                      Reject
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default LoanApplications;