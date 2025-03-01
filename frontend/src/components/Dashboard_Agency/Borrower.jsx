import { useState } from "react";

const Borrowers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const borrowers = [
    { id: "BRW001", name: "Rahul Kumar", email: "rahul.kumar@example.com", phone: "+91 98765 43210", activeLoans: 1, totalAmount: "₹50,000", cibil: 750 },
    { id: "BRW002", name: "Priya Singh", email: "priya.singh@example.com", phone: "+91 98765 43211", activeLoans: 2, totalAmount: "₹2,50,000", cibil: 820 },
    { id: "BRW003", name: "Amit Patel", email: "amit.patel@example.com", phone: "+91 98765 43212", activeLoans: 1, totalAmount: "₹1,50,000", cibil: 680 },
    { id: "BRW004", name: "Sneha Gupta", email: "sneha.gupta@example.com", phone: "+91 98765 43213", activeLoans: 1, totalAmount: "₹75,000", cibil: 710 },
    { id: "BRW005", name: "Rajesh Sharma", email: "rajesh.sharma@example.com", phone: "+91 98765 43214", activeLoans: 2, totalAmount: "₹3,00,000", cibil: 790 },
  ];

  const filteredBorrowers = borrowers.filter((borrower) =>
    borrower.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="m-10 text-white" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <div className="px-4">
      <h1 className="p-1">Borrowers</h1> 
      <p >View and manage all registered borrowers.</p>
      </div>

      {/* Search Bar */}
      <div className="px-5 my-3 ">
        <input
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search borrowers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Borrowers Table */}
      <div className="table-responsive m-5">
        <table className="table table-dark table-hover border-secondary">
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
            {filteredBorrowers.map((borrower) => (
              <tr key={borrower.id}>
                <td className="d-flex align-items-center">
                  <div className="rounded-circle bg-secondary d-flex justify-content-center align-items-center text-dark fw-bold" style={{ width: "40px", height: "40px" }}>
                    {borrower.name.charAt(0)}
                  </div>
                  <div className="ms-2">
                    <p className="mb-0 fw-bold">{borrower.name}</p>
                    <small className="text-white-50">ID: {borrower.id}</small>
                  </div>
                </td>
                <td>
                  <p className="mb-0">{borrower.email}</p>
                  <small className="text-white-50">{borrower.phone}</small>
                </td>
                <td>{borrower.activeLoans}</td>
                <td>{borrower.totalAmount}</td>
                <td>{borrower.cibil}</td>
                <td>
                  <button className="btn btn-outline-light btn-sm me-2">View Profile</button>
                  <button className="btn btn-outline-light btn-sm">Loan History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Borrowers;
