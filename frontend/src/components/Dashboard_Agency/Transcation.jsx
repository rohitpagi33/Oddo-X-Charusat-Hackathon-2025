import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All Transactions");

  useEffect(() => {
    const fetchTransactions = async () => {
      const { data, error } = await supabase
        .from('transactions')
        .select('*');

      if (error) {
        console.error("Error fetching transactions:", error);
      } else {
        setTransactions(data);
      }
    };

    fetchTransactions();
  }, []);

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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterType(e.target.value);
  };

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch = txn.borrower.toLowerCase().includes(searchTerm.toLowerCase()) || txn.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "All Transactions" || txn.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container-md p-5 text-white" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      <h1 className="mb-4">Transactions</h1>
      <p className="text-secondary">View and manage all loan disbursements and EMI payments</p>

      {/* Search & Filter */}
      <div className="d-flex justify-content-between mb-3">
        <Form.Control
          type="text"
          placeholder="Search transactions..."
          className="w-50"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <div>
          <Form.Select className="me-2 d-inline w-auto" value={filterType} onChange={handleFilterChange}>
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
          {filteredTransactions.map((txn) => (
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
