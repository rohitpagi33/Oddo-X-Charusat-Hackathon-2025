import React, { useEffect, useState } from "react";
import { Table, Button, Form, InputGroup, Spinner } from "react-bootstrap";
import { supabase } from "../../supabaseClient"; // Ensure this path is correct

const LoanApplications = () => {
  const [search, setSearch] = useState("");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch loan applications from Supabase
  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("loan_application").select("*");

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
      .from("loan_application")
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
      <p style={{ backgroundColor: "#121212" }}>Manage and review all loan applications</p>

      <InputGroup className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search applications..."
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
              <th>Applicant Name</th>
              <th>Loan Type</th>
              <th>Amount</th>
              <th>CIBIL Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications
              .filter(app =>
                app.name.toLowerCase().includes(search.toLowerCase()) ||
                app.id.toLowerCase().includes(search.toLowerCase())
              )
              .map((app) => (
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
