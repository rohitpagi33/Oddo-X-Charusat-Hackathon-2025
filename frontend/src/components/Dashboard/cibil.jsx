import React, { useState } from "react";
import { Card, Button, Form, InputGroup } from "react-bootstrap";

export default function CIBIL() {
  const [panNumber, setPanNumber] = useState("");
  const [dob, setDob] = useState("");
  const [score, setScore] = useState(null);

  const handleCheckScore = (e) => {
    e.preventDefault();
    // Simulate checking CIBIL score (Replace with actual API call)
    const mockScore = Math.floor(Math.random() * (900 - 300 + 1)) + 300;
    setScore(mockScore);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Check Your CIBIL Score</h1>
      <Card className="p-4 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleCheckScore}>
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
                  type="date"
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
