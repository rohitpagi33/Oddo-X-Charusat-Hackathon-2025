import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://leetdbckchemfsgqzwaj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZXRkYmNrY2hlbWZzZ3F6d2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NjEyODMsImV4cCI6MjA1NjIzNzI4M30.lUkX1LQCjmXq9gLv0BEqWyyMc4nvniJsyi1cJHy2aL0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SignatureComponent() {
    const [sign, setSign] = useState(null); 
    const [url, setUrl] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState(""); 

    const handleClear = () => {
        try {
            if (sign) {
                sign.clear();
                setUrl("");
                setSubmissionStatus(""); 
            }
        } catch (error) {
            console.error("Error clearing signature:", error);
            setSubmissionStatus(`Error clearing signature: ${error.message}`);
        }
    };

    // Generate PNG from signature and upload to Supabase Storage
    const handleGenerateSignature = async () => {
        setSubmissionStatus("");
        try {
            if (sign && !sign.isEmpty()) {
                const dataURL = sign.toDataURL("image/png");

                const response = await fetch(dataURL);
                const blob = await response.blob();

                const filename = `signatures/${Date.now()}.png`;
                const { data, error } = await supabase.storage
                    .from('uploads')
                    .upload(filename, blob, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (error) {
                    console.error("Error uploading signature to Supabase:", error);
                    setSubmissionStatus(`Error uploading signature: ${error.message}`);
                } else {
                    const fileUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${filename}`;
                    console.log("Signature uploaded successfully, file URL:", fileUrl);
                    setUrl(fileUrl);
                    setSubmissionStatus("Signature generated and uploaded successfully!");
                }

            } else {
                console.warn("No signature to generate.");
                setSubmissionStatus("Please draw your signature.");
            }
        } catch (error) {
            console.error("Error generating or uploading signature:", error);
            setSubmissionStatus(`Error processing signature: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Digital Signature Capture</h2>
            <div style={{ border: "2px solid black", width: 500, height: 200, marginBottom: '10px' }}>
                <SignatureCanvas
                    canvasProps={{ width: 500, height: 200, className: "sigCanvas", backgroundColor: 'whitesmoke' }}
                    ref={(ref) => setSign(ref)}
                />
            </div>

            <button type="button" onClick={handleClear} style={{ height: "50px", width: "30%", marginRight: "10px" }}>
                Clear
            </button>
            <button type="button" onClick={handleGenerateSignature} style={{ height: "50px", width: "30%" }}>
                Generate Signature
            </button>

            {url && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Signature Preview:</h3>
                    <img src={url} alt="Digital Signature" style={{ border: "1px solid gray", maxWidth: '500px', maxHeight: '200px' }} />
                </div>
            )}

            {submissionStatus && (
                <p style={{ color: submissionStatus.includes("Error") ? "red" : "green", marginTop: '10px' }}>
                    {submissionStatus}
                </p>
            )}
        </div>
    );
}