"use client";

import { useState } from "react";

export default function Borrowers() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBorrowers = borrowers.filter(
    (borrower) =>
      borrower.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      borrower.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAction = (action, id) => {
    alert(`${action} for borrower ${id} has been viewed.`);
  };

  return (
    <div className="grid gap-4">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Borrowers</h2>
          <p className="card-description">View and manage all registered borrowers</p>
        </div>
        <div className="card-content">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1">
              <label htmlFor="search" className="sr-only">
                Search borrowers
              </label>
              <div className="relative">
                <input
                  id="search"
                  placeholder="Search borrowers..."
                  className="input pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="table-header">
                <tr className="table-row">
                  <th className="table-head">Borrower</th>
                  <th className="table-head">Contact</th>
                  <th className="table-head">Active Loans</th>
                  <th className="table-head">Total Amount</th>
                  <th className="table-head">CIBIL Score</th>
                  <th className="table-head">Actions</th>
                </tr>
              </thead>
              <tbody className="table-body">
                {filteredBorrowers.map((borrower) => (
                  <tr key={borrower.id} className="table-row">
                    <td className="table-cell">
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <img src={borrower.avatar} alt={borrower.name} className="avatar-image" />
                          <div className="avatar-fallback">{borrower.name.charAt(0)}</div>
                        </div>
                        <div>
                          <div className="font-medium">{borrower.name}</div>
                          <div className="text-sm text-muted-foreground">ID: {borrower.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <div className="text-sm">
                        <div>{borrower.email}</div>
                        <div className="text-muted-foreground">{borrower.phone}</div>
                      </div>
                    </td>
                    <td className="table-cell">{borrower.activeLoans}</td>
                    <td className="table-cell">₹{borrower.totalAmount}</td>
                    <td className="table-cell">{borrower.cibilScore}</td>
                    <td className="table-cell">
                      <div className="flex gap-2">
                        <button className="button button-outline" onClick={() => handleAction("Profile", borrower.id)}>
                          View Profile
                        </button>
                        <button className="button button-outline" onClick={() => handleAction("Loan History", borrower.id)}>
                          Loan History
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const borrowers = [
  {
    id: "BRW001",
    name: "Rahul Kumar",
    avatar: "/placeholder.svg",
    email: "rahul.kumar@example.com",
    phone: "+91 98765 43210",
    activeLoans: 1,
    totalAmount: "50,000",
    cibilScore: 750,
  },
  {
    id: "BRW002",
    name: "Priya Singh",
    avatar: "/placeholder.svg",
    email: "priya.singh@example.com",
    phone: "+91 98765 43211",
    activeLoans: 2,
    totalAmount: "2,50,000",
    cibilScore: 820,
  },
  {
    id: "BRW003",
    name: "Amit Patel",
    avatar: "/placeholder.svg",
    email: "amit.patel@example.com",
    phone: "+91 98765 43212",
    activeLoans: 1,
    totalAmount: "1,50,000",
    cibilScore: 680,
  },
  {
    id: "BRW004",
    name: "Sneha Gupta",
    avatar: "/placeholder.svg",
    email: "sneha.gupta@example.com",
    phone: "+91 98765 43213",
    activeLoans: 1,
    totalAmount: "75,000",
    cibilScore: 710,
  },
  {
    id: "BRW005",
    name: "Rajesh Sharma",
    avatar: "/placeholder.svg",
    email: "rajesh.sharma@example.com",
    phone: "+91 98765 43214",
    activeLoans: 2,
    totalAmount: "3,00,000",
    cibilScore: 790,
  },
];