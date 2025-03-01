import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient"; // Import your Supabase client

const Borrowers = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [borrowers, setBorrowers] = useState([]); // State for storing fetched data

  useEffect(() => {
    fetchBorrowers();
  }, []);

  // Fetch borrowers from Supabase
  const fetchBorrowers = async () => {
    try {
      const { data, error } = await supabase.from("borrowers").select("*");
      if (error) throw error;
      setBorrowers(data);
    } catch (error) {
      console.error("Error fetching borrowers:", error.message);
    }
  };

  // Filter search results
  const filteredBorrowers = borrowers.filter((borrower) =>
    borrower.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-md p-5 text-white" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 className="mb-4">Borrowers</h1>

      {/* Search Bar */}
      <div className="px-5 my-3">
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search borrowers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Borrowers Table */}
      <div className="table-responsive">
        <table className="table table-dark table-hover">
          <thead>
            <tr>
              <th>Borrower</th>
              <th>Contact</th>
              <th>Active Loans</th>
              <th>Total Amount</th>
              <th>CIBIL Score</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBorrowers.length > 0 ? (
              filteredBorrowers.map((borrower) => (
                <tr key={borrower.id}>
                  <td className="d-flex align-items-center">
                    <div className="rounded-circle bg-secondary" style={{ width: "40px", height: "40px" }}></div>
                    <div className="ms-2">
                      <p className="mb-0 fw-bold">{borrower.name}</p>
                      <small className="text-white">ID: {borrower.id}</small>
                    </div>
                  </td>
                  <td>
                    <p className="mb-0">{borrower.email}</p>
                    <small className="text-muted">{borrower.phone}</small>
                  </td>
                  <td>{borrower.activeLoans}</td>
                  <td>{borrower.totalAmount}</td>
                  <td>{borrower.cibil}</td>
                  <td>
                    <button className="btn btn-outline-light btn-sm me-2">View Profile</button>
                    <button className="btn btn-outline-light btn-sm">Loan History</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No borrowers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Borrowers;
