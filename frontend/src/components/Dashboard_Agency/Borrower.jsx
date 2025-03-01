import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import { Spinner } from 'react-bootstrap';
import { Button, Table } from "react-bootstrap";
import BorrowerDetails from "./BorrowerDetails";

const ApprovedLoanApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Borrower, setBorrower] = useState(null); // State to store selected loan

  // Fetch approved loan applications
  const fetchApprovedApplications = async () => {
    setLoading(true);
    try {
      // Get loan applications where status = 'Approved'
      const { data, error } = await supabase
        .from("loan_applications")
        .select(`
          id,
          loan_amount,
          monthly_income,
          loan_tenure,
          status,
          borrower
        `)
        .eq("status", "Approved"); // Filter by approved status

      if (error) throw error;
      setApplications(data); // Set the fetched approved applications
    } catch (error) {
      console.error("Error fetching approved loan applications:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch applications on component mount
  useEffect(() => {
    fetchApprovedApplications();
  }, []);

  if (Borrower) {
    return <BorrowerDetails borrower={Borrower} onBack={() => setBorrower(null)} />;
  }

  return (
    <div className="container-md p-5 text-white" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 className="mb-4">Borrowers</h1>

      {loading ? (
        <div className="text-center text-white">
          <Spinner animation="border" />
          <p>Loading applications...</p>
        </div>
      ) : (
        <div>
          {applications.length === 0 ? (
            <p>No approved loan applications found.</p>
          ) : (
            <table className="table table-dark table-hover">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Amount</th>
                  <th>Monthly Income</th>
                  <th>Loan Tenure</th>
                  <th>Borrower</th>
                  <th>view profile</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((application) => (
                  <tr key={application.id}>
                    <td>{application.id}</td>
                    <td>
                      <a rel="noopener noreferrer">
                      {application.loan_amount}
                      </a>
                    </td>
                    <td>
                      <a rel="noopener noreferrer">
                      {application.monthly_income}
                      </a>
                    </td>
                    <td>
                      <a rel="noopener noreferrer">
                      {application.loan_tenure}
                      </a>
                    </td>
                    <td>{application.borrower}</td>
                    <td>
                    <a rel="noopener noreferrer">
                    <Button variant="light" size="sm" className="me-2" onClick={() => setBorrower(application)} >View</Button>
                      </a>
                      </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ApprovedLoanApplications;
