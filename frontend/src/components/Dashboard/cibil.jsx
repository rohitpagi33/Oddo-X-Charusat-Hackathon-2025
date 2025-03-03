import React, { useState } from "react";
import { Card, Button, Form, InputGroup, Alert } from "react-bootstrap";
import { supabase } from "../../supabaseClient";  // Import Supabase client

export default function CIBIL() {
  const [panNumber, setPanNumber] = useState("");
  const [dob, setDob] = useState("");
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  // Function to fetch CIBIL score from Supabase
  const fetchCibilScore = async (pan, dob) => {
    try {
      const { data, error } = await supabase
        .from("cibil_scores")  // Make sure your table name matches
        .select("score")
        .eq("pan", pan)
        .eq("dob", dob);

      if (error) throw new Error("Database error: " + error.message);
      if (!data.length) throw new Error("CIBIL Score not found for the given PAN and DOB.");

      return data[0].score;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const handleFetch = async (e) => {
    e.preventDefault();
    setScore(null);
    setError("");

    try {
      const fetchedScore = await fetchCibilScore(panNumber, dob);
      setScore(fetchedScore);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Check Your CIBIL Score</h1>
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleFetch}>
            <Form.Group className="mb-3">
              <Form.Label>PAN Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your PAN number"
                value={panNumber}
                onChange={(e) => setPanNumber(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="YYYY-MM-DD"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  required
                />
              </InputGroup>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Check CIBIL Score
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {error && (
        <Alert variant="danger" className="mt-4 text-center">
          {error}
        </Alert>
      )}

      {score !== null && (
        <Card className="mt-4 p-4 text-center shadow-sm">
          <Card.Body>
            <h4>Your CIBIL Score:</h4>
            <h2 className="text-success">{score}</h2>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}
