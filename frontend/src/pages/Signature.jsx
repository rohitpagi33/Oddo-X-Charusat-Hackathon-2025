// // import React, { useState, useRef } from "react";
// // import SignatureCanvas from "react-signature-canvas";
// // import { createClient } from '@supabase/supabase-js';
// // import AWS from 'aws-sdk';

// // // Supabase S3-compatible endpoint configuration
// // const s3 = new AWS.S3({
// //     endpoint: 'https://leetdbckchemfsgqzwaj.supabase.co/storage/v1/s3', // Your Supabase S3 endpoint
// //     region: 'ap-south-1', // Your region (or default region)
// //     accessKeyId: 'process.env.REACT_APP_S3_ACCESS_KEY', // Your access key ID
// //     secretAccessKey: 'process.env.REACT_APP_S3_SECRET_ACCESS_KEY', // Your secret access key
// // });

// // const BUCKET_NAME = 'uploads'; // Your bucket name

// // export default function SignaturePad() {
// //     const [sign, setSign] = useState(null); // SignatureCanvas ref
// //     const [url, setUrl] = useState(""); // PNG data URL
// //     const [formData, setFormData] = useState({
// //         name: "",
// //         amount: "",
// //         loanType: "",
// //     });
// //     const [submissionStatus, setSubmissionStatus] = useState(""); // Success/Error message

// //     // Handle form input changes
// //     const handleInputChange = (e) => {
// //         const { name, value } = e.target;
// //         setFormData((prev) => ({ ...prev, [name]: value }));
// //     };

// //     // Clear signature
// //     const handleClear = () => {
// //         try {
// //             if (sign) {
// //                 sign.clear();
// //                 setUrl("");
// //             }
// //         } catch (error) {
// //             console.error("Error clearing signature:", error);
// //         }
// //     };

// //     // Generate PNG from signature and upload to Supabase S3-compatible storage
// //     const handleGenerate = () => {
// //         try {
// //             if (sign && !sign.isEmpty()) {
// //                 const dataURL = sign.toDataURL("image/png");
// //                 setUrl(dataURL);

// //                 // Convert dataURL to Blob
// //                 const response = fetch(dataURL);
// //                 response.then(res => res.blob()).then(blob => {
// //                     // Upload the Blob to Supabase Storage (S3-compatible)
// //                     const filename = `signatures/${Date.now()}.png`; // Example filename
// //                     const params = {
// //                         Bucket: BUCKET_NAME,
// //                         Key: filename,
// //                         Body: blob,
// //                         ContentType: 'image/png',
// //                         ACL: 'public-read', // Ensure file is publicly accessible
// //                     };

// //                     s3.putObject(params, (err, data) => {
// //                         if (err) {
// //                             console.error("Error uploading signature to S3:", err);
// //                         } else {
// //                             const fileUrl = `https://leetdbckchemfsgqzwaj.supabase.co/storage/v1/object/public/${BUCKET_NAME}/${filename}`;
// //                             console.log("Signature uploaded successfully, file URL:", fileUrl);
// //                             setUrl(fileUrl); // Update the URL with the public URL from Supabase
// //                         }
// //                     });
// //                 });
// //             } else {
// //                 console.error("Signature is empty or not available");
// //             }
// //         } catch (error) {
// //             console.error("Error generating signature image:", error);
// //         }
// //     };

// //     // Submit loan application
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         setSubmissionStatus("");

// //         try {
// //             if (!formData.name || !formData.amount || !formData.loanType) {
// //                 setSubmissionStatus("All fields are required");
// //                 return;
// //             }
// //             if (!url) {
// //                 setSubmissionStatus("Please generate a signature");
// //                 return;
// //             }

// //             // Create FormData for the loan application
// //             const submissionData = new FormData();
// //             submissionData.append("name", formData.name);
// //             submissionData.append("amount", formData.amount);
// //             submissionData.append("loanType", formData.loanType);
// //             submissionData.append("signature", url); // You can append the Supabase file URL here

// //             // Send to backend
// //             const res = await fetch("http://localhost:5000/api/loans/apply-loan", {
// //                 method: "POST",
// //                 body: submissionData,
// //             });

// //             const data = await res.json();
// //             if (!res.ok) throw new Error(data.message || "Submission failed");

// //             setSubmissionStatus("Loan application submitted successfully!");
// //             handleClear(); // Clear signature after success
// //             setFormData({ name: "", amount: "", loanType: "" }); // Reset form
// //         } catch (error) {
// //             console.error("Submission error:", error);
// //             setSubmissionStatus(`Error: ${error.message}`);
// //         }
// //     };

// //     return (
// //         <div style={{ padding: "20px" }}>
// //             <form onSubmit={handleSubmit}>
// //                 <div style={{ border: "2px solid black", width: 500, height: 200 }}>
// //                     <SignatureCanvas
// //                         canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
// //                         ref={(ref) => setSign(ref)}
// //                     />
// //                 </div>

// //                 <br />
// //                 <button type="button" onClick={handleClear} style={{ height: "30px", width: "60px", marginRight: "10px" }}>
// //                     Clear
// //                 </button>
// //                 <button type="submit" style={{ height: "30px", width: "60px" }}>
// //                     Submit
// //                 </button>

// //                 <br /><br />
// //                 {url && <img src={url} alt="Signature preview" style={{ border: "1px solid gray" }} />}
// //                 {submissionStatus && <p style={{ color: submissionStatus.includes("Error") ? "red" : "green" }}>{submissionStatus}</p>}
// //             </form>
// //         </div>
// //     );
// // }



// import React, { useState } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = 'https://leetdbckchemfsgqzwaj.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZXRkYmNrY2hlbWZzZ3F6d2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NjEyODMsImV4cCI6MjA1NjIzNzI4M30.lUkX1LQCjmXq9gLv0BEqWyyMc4nvniJsyi1cJHy2aL0'; 
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default function SignaturePad() {
//     const [sign, setSign] = useState(null); // SignatureCanvas ref
//     const [url, setUrl] = useState(""); // PNG data URL
//     const [formData, setFormData] = useState({
//         name: "",
//         amount: "",
//         loanType: "",
//     });
//     const [submissionStatus, setSubmissionStatus] = useState(""); // Success/Error message

//     // Handle form input changes
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({ ...prev, [name]: value }));
//     };

//     // Clear signature
//     const handleClear = () => {
//         try {
//             if (sign) {
//                 sign.clear();
//                 setUrl("");
//             }
//         } catch (error) {
//             console.error("Error clearing signature:", error);
//         }
//     };

//     // Generate PNG from signature and upload to Supabase
//     const handleGenerate = async () => {
//         try {
//             if (sign && !sign.isEmpty()) {
//                 const dataURL = sign.toDataURL("image/png");
//                 setUrl(dataURL);

//                 // Convert dataURL to Blob
//                 const response = await fetch(dataURL);
//                 const blob = await response.blob();

//                 // Upload the Blob to Supabase Storage
//                 const filename = `signatures/${Date.now()}.png`; // Example filename
//                 const { data, error } = await supabase.storage
//                     .from('uploads') // Your Supabase Storage bucket name
//                     .upload(filename, blob, {
//                         cacheControl: '3600',
//                         upsert: true, // Overwrite if file with the same name exists
//                     });

//                 if (error) {
//                     console.error("Error uploading signature to Supabase:", error);
//                 } else {
//                     const fileUrl = `${supabaseUrl}/storage/v1/object/public/uploads/${filename}`;
//                     console.log("Signature uploaded successfully, file URL:", fileUrl);
//                     setUrl(fileUrl); // Update the URL with the public URL from Supabase
//                 }
//             } else {
//                 console.error("Signature is empty or not available");
//             }
//         } catch (error) {
//             console.error("Error generating signature image:", error);
//         }
//     };

//     // Submit loan application
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSubmissionStatus("");

//         try {
//             if (!formData.name || !formData.amount || !formData.loanType) {
//                 setSubmissionStatus("All fields are required");
//                 return;
//             }
//             if (!url) {
//                 setSubmissionStatus("Please generate a signature");
//                 return;
//             }

//             // Create FormData for the loan application
//             const submissionData = new FormData();
//             submissionData.append("name", formData.name);
//             submissionData.append("amount", formData.amount);
//             submissionData.append("loanType", formData.loanType);
//             submissionData.append("signature", url); // Append the Supabase file URL here

//             // Send to backend
//             const res = await fetch("http://localhost:5000/api/loans/apply-loan", {
//                 method: "POST",
//                 body: submissionData,
//             });

//             const data = await res.json();
//             if (!res.ok) throw new Error(data.message || "Submission failed");

//             setSubmissionStatus("Loan application submitted successfully!");
//             handleClear(); // Clear signature after success
//             setFormData({ name: "", amount: "", loanType: "" }); // Reset form
//         } catch (error) {
//             console.error("Submission error:", error);
//             setSubmissionStatus(`Error: ${error.message}`);
//         }
//     };

//     return (
//         <div style={{ padding: "20px" }}>
//             <form onSubmit={handleSubmit}>
//                 <div style={{ border: "2px solid black", width: 500, height: 200 }}>
//                     <SignatureCanvas
//                         canvasProps={{ width: 500, height: 200, className: "sigCanvas" }}
//                         ref={(ref) => setSign(ref)}
//                     />
//                 </div>

//                 <br />
//                 <button type="button" onClick={handleClear} style={{ height: "30px", width: "60px", marginRight: "10px" }}>
//                     Clear
//                 </button>
//                 <button type="button" onClick={handleGenerate} style={{ height: "30px", width: "60px", marginRight: "10px" }}>
//                     Generate
//                 </button>
//                 <button type="submit" style={{ height: "30px", width: "60px" }}>
//                     Submit
//                 </button>

//                 <br /><br />
//                 {url && <img src={url} alt="Signature preview" style={{ border: "1px solid gray" }} />}
//                 {submissionStatus && <p style={{ color: submissionStatus.includes("Error") ? "red" : "green" }}>{submissionStatus}</p>}
//             </form>
//         </div>
//     );
// }



import React, { useState, useRef } from "react";
import SignatureCanvas from "react-signature-canvas";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://leetdbckchemfsgqzwaj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxlZXRkYmNrY2hlbWZzZ3F6d2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2NjEyODMsImV4cCI6MjA1NjIzNzI4M30.lUkX1LQCjmXq9gLv0BEqWyyMc4nvniJsyi1cJHy2aL0';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function SignatureComponent() {
    const [sign, setSign] = useState(null); // SignatureCanvas ref
    const [url, setUrl] = useState(""); // PNG data URL
    const [submissionStatus, setSubmissionStatus] = useState(""); // Success/Error message

    // Clear signature
    const handleClear = () => {
        try {
            if (sign) {
                sign.clear();
                setUrl("");
                setSubmissionStatus(""); // Clear any previous status messages
            }
        } catch (error) {
            console.error("Error clearing signature:", error);
            setSubmissionStatus(`Error clearing signature: ${error.message}`);
        }
    };

    // Generate PNG from signature and upload to Supabase Storage
    const handleGenerateSignature = async () => {
        setSubmissionStatus(""); // Reset status message on new attempt
        try {
            if (sign && !sign.isEmpty()) {
                const dataURL = sign.toDataURL("image/png");

                // Convert dataURL to Blob
                const response = await fetch(dataURL);
                const blob = await response.blob();

                // Upload the Blob to Supabase Storage in "uploads/signatures" folder
                const filename = `signatures/${Date.now()}.png`;
                const { data, error } = await supabase.storage
                    .from('uploads') // Your bucket name is 'uploads'
                    .upload(filename, blob, {
                        cacheControl: '3600',
                        upsert: false // Set to true if you want to overwrite existing files with the same name
                    });

                if (error) {
                    console.error("Error uploading signature to Supabase:", error);
                    setSubmissionStatus(`Error uploading signature: ${error.message}`);
                } else {
                    // Get public URL of the uploaded image
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

            <button type="button" onClick={handleClear} style={{ height: "30px", width: "80px", marginRight: "10px" }}>
                Clear
            </button>
            <button type="button" onClick={handleGenerateSignature} style={{ height: "30px", width: "120px" }}>
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