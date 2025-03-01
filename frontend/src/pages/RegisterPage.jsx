import React, { useState } from "react";
import { Container, Form, Button, Card, Row, Col, Alert } from "react-bootstrap";
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [message, setMessage] = useState(null);

  const handleSendOTP = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber }),
    });
    const data = await response.json();
    if (response.ok) {
      setStep(2);
      setMessage({ type: "success", text: "OTP sent successfully!" });
    } else {
      setMessage({ type: "danger", text: data.error });
    }
  };

  const handleVerifyOTP = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, otp }),
    });
    const data = await response.json();
    if (response.ok) {
      setStep(3);
      setMessage({ type: "success", text: "OTP verified successfully!" });
    } else {
      setMessage({ type: "danger", text: data.error });
    }
  };

  const handleRegister = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, name, panNumber }),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage({ type: "success", text: "Registration successful!" });
      window.location.href = "/dashboard";
    } else {
      setMessage({ type: "danger", text: data.error });
    }
  };

  const handleBack = () => setStep(step - 1);

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg border-0" style={{ width: "380px", borderRadius: "16px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)" }}>
        <h3 className="text-center mb-4 text-dark">Register</h3>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control type="text" placeholder="Enter mobile number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                <Button className="mt-3 w-100" variant="primary" onClick={handleSendOTP}>
                Send OTP
              </Button>
              </Form.Group>
              
            </>
          )}
          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} />
                <Button className="mt-3 w-100" variant="success" onClick={handleVerifyOTP}>
                Verify OTP
              </Button>
              <Button variant="secondary" className="mt-2 w-100" onClick={handleBack}>Back</Button>
              </Form.Group>
              
            </>
          )}
          {step === 3 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter full name" value={name} onChange={(e) => setName(e.target.value)} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>PAN Number</Form.Label>
                <Form.Control type="text" placeholder="Enter PAN" value={panNumber} onChange={(e) => setPanNumber(e.target.value)} />
              </Form.Group>

              <Button className="w-100" variant="dark" onClick={handleRegister}>
                Register
              </Button>
            </>
          )}
        </Form>
        <div className="text-center mt-3">
          <p className="text-muted">
            Already have an account? <Link to="/login" className="text-dark fw-bold">Login</Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default RegisterPage;