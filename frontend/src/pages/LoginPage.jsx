import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState(null);
  const [step, setStep] = useState(1);

    const userId = localStorage.getItem("userId");
    const role = localStorage.getItem("role");

    if (userId && role) {
      // Redirect to the appropriate dashboard based on the user's role
      if (role === "admin") {
        window.location.href = "/dashboard_admin";
      } else if (role === "user") {
        window.location.href = "/dashboard_user";
      } else if (role === "agency") {
        window.location.href = "/dashboard_agency";
      }
    }

  const handleSendOTP = async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/send-otp-login`, {
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
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/verify-otp-login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, otp }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("role", data.role);
      setMessage({ type: "success", text: "Login successful!" });

      // Redirect based on role
      if (data.role === "admin") {
        window.location.href = "/dashboard_admin";
      } else if (data.role === "user") {
        window.location.href = "/dashboard_user";
      } else if (data.role === "agency") {
        window.location.href = "/dashboard_agency";
      }
    } else {
      setMessage({ type: "danger", text: data.error });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg" style={{ width: '400px' }}>
        <h3 className="text-center mb-3">Login</h3>
        {message && <Alert variant={message.type}>{message.text}</Alert>}
        <Form>
          {step === 1 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="Enter your phone number"
                />
              </Form.Group>
              <Button
                className="w-100"
                variant="primary"
                onClick={handleSendOTP}
              >
                Send OTP
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Enter OTP</Form.Label>
                <Form.Control
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter OTP"
                />
              </Form.Group>
              <Button
                className="w-100"
                variant="success"
                onClick={handleVerifyOTP}
              >
                Verify OTP
              </Button>
            </>
          )}
        </Form>

        <div className="text-center mt-3">
          <p className="text-muted">
            Don't have an account?{' '}
            <Link to="/register" className="text-dark fw-bold">
              Sign Up
            </Link>
          </p>
        </div>
      </Card>
    </Container>
  );
};

export default LoginPage;