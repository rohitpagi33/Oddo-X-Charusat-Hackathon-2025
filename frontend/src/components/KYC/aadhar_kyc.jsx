import { useState } from "react";
import { supabase } from "../../supabaseClient";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AadharKYC() {
  const [aadharNumber, setAadharNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState(null);
  const [kycDetails, setKycDetails] = useState(null);
  const [verificationTime, setVerificationTime] = useState(null);
  const [error, setError] = useState("");

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const fetchAadharDetails = async () => {
    setError("");
    if (!aadharNumber) {
      setError("Please enter an Aadhaar number.");
      return;
    }

    const { data, error } = await supabase
      .from("kyc_users")
      .select("*")
      .eq("aadhar_number", aadharNumber)
      .single();

    if (error || !data) {
      setError("Aadhaar number not found.");
      return;
    }

    const otpCode = generateOtp();
    setSentOtp(otpCode);
    alert(`OTP sent to registered mobile: ${data.mobile}`);
  };

  const verifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    if (parseInt(otp) !== sentOtp) {
      setError("Invalid OTP.");
      return;
    }

    const { data, error } = await supabase
      .from("kyc_users")
      .select("*")
      .eq("aadhar_number", aadharNumber)
      .single();

    if (error || !data) {
      setError("Verification failed.");
      return;
    }

    setKycDetails(data);
    const timestamp = new Date().toISOString();
    setVerificationTime(timestamp);

    const { error: insertError } = await supabase.from("recent_activities").insert([
      {
        user_id: data.user_id, // Ensure `user_id` exists in `kyc_users`
        title: "KYC Successful",
        description: `User KYC verification completed successfully.`,
        date: timestamp,
      },
    ]);

    if (insertError) {
      setError("Error logging KYC activity.");
      console.error(insertError);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-3">Aadhar KYC Verification</h1>
      <div className="card">
        <div className="card-body">
          {!kycDetails ? (
            <>
              <div className="mb-3">
                <label className="form-label">Enter Aadhar Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={aadharNumber}
                  onChange={(e) => setAadharNumber(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" onClick={fetchAadharDetails}>
                Send OTP
              </button>
              {sentOtp && (
                <>
                  <div className="mt-3">
                    <label className="form-label">Enter OTP</label>
                    <input
                      type="text"
                      className="form-control"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </div>
                  <button className="btn btn-success mt-2" onClick={verifyOtp}>
                    Verify OTP
                  </button>
                </>
              )}
            </>
          ) : (
            <div>
              <h5>KYC Verified Successfully</h5>
              <p><strong>Name:</strong> {kycDetails.user_name}</p>
              <p><strong>DOB:</strong> {kycDetails.dob}</p>
              <p><strong>Address:</strong> {kycDetails.address}</p>
              <p><strong>Mobile:</strong> {kycDetails.mobile}</p>
              <p><strong>Verified On:</strong> {verificationTime}</p>
            </div>
          )}
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
}
