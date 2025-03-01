import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { supabase } from "../../supabaseClient"; // Ensure this is correctly imported

const LoanApplications = () => {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch loan applications from Supabase
  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("loan_applications")
      .select("id, loan_type, loan_amount, loan_tenure, monthly_income, employment_type, created_at, status");

    if (error) {
      console.error("Error fetching applications:", error);
    } else {
      setApplications(data);
    }
    setLoading(false);
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  // Handle status update in Supabase
  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from("loan_applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error("Error updating status:", error);
    } else {
      setApplications(applications.map(app =>
        app.id === id ? { ...app, status: newStatus } : app
      ));
    }
  };

  return (
    <div className="container-md p-5 text-white" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 className="mb-4">Loan Applications</h1>
      <p>Manage and review all loan applications</p>

      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search applications by loan type or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </InputGroup>

      {loading ? (
        <div className="text-center text-white">
          <Spinner animation="border" />
          <p>Loading applications...</p>
        </div>
      ) : (
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Loan Type</th>
              <th>Amount (₹)</th>
              <th>Tenure (months)</th>
              <th>Monthly Income (₹)</th>
              <th>Employment Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications
              .filter(app =>
                app.loan_type.toLowerCase().includes(search.toLowerCase()) ||
                app.id.toString().includes(search)
              )
              .map((app) => (
                <tr key={app.id}>
                  <td>{app.id}</td>
                  <td>{app.loan_type}</td>
                  <td>₹{app.loan_amount}</td>
                  <td>{app.loan_tenure} months</td>
                  <td>₹{app.monthly_income}</td>
                  <td>{app.employment_type}</td>
                  <td>
                    <span 
                      className={`badge bg-${app.status === "Approved" ? "success" : app.status === "Rejected" ? "danger" : "secondary"}`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>
                  <td>
                    <Button variant="light" size="sm" className="me-2">View</Button>
                    {app.status === null || app.status === "Pending" ? (
                      <>
                        <Button 
                          variant="success" 
                          size="sm" 
                          className="me-2" 
                          onClick={() => handleStatusChange(app.id, "Approved")}
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="danger" 
                          size="sm" 
                          onClick={() => handleStatusChange(app.id, "Rejected")}
                        >
                          Reject
                        </Button>
                      </>
                    ) : (
                      <span className="text-muted">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default LoanApplications;
