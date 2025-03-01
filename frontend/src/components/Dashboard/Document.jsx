import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";

// Ensure environment variables are properly accessed
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Supabase URL or Key is missing. Check your environment variables.");
}

// Initialize Supabase client with error handling
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

export default function DocumentUpload() {
    const [file, setFile] = useState(null);
    const [url, setUrl] = useState("");
    const [submissionStatus, setSubmissionStatus] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    // Handle file selection
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setSubmissionStatus(""); // Clear status on new file selection
        }
    };

    // Clear form state
    const handleClear = () => {
        setFile(null);
        setUrl("");
        setSubmissionStatus("");
    };

    // Upload document to Supabase
    const handleUploadDocument = async () => {
        if (!supabase) {
            setSubmissionStatus("Error: Supabase client is not initialized.");
            return;
        }

        if (!file) {
            setSubmissionStatus("Please select a document to upload.");
            return;
        }

        setIsUploading(true);
        setSubmissionStatus("");

        try {
            const filename = `documents/${Date.now()}-${file.name}`;
            const { data, error } = await supabase.storage
                .from("uploads")
                .upload(filename, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (error) {
                throw new Error(error.message);
            }

            // Construct the public URL correctly
            const { data: publicUrlData } = supabase.storage
                .from("uploads")
                .getPublicUrl(filename);

            const fileUrl = publicUrlData?.publicUrl || `${supabaseUrl}/storage/v1/object/public/uploads/${filename}`;
            setUrl(fileUrl);
            setSubmissionStatus("Document uploaded successfully!");
        } catch (error) {
            setSubmissionStatus(`Error: ${error.message}`);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Document Upload</h2>
            <input
                type="file"
                onChange={handleFileChange}
                disabled={isUploading}
                style={{ marginBottom: "10px" }}
            />
            <br />
            <button
                type="button"
                onClick={handleClear}
                style={{ height: "50px", width: "30%",marginRight:"10px"}}
                disabled={isUploading}
            >
                Clear
            </button>
            <button
                type="button"
                onClick={handleUploadDocument}
                style={{ height: "50px", width: "30%" }}
                disabled={isUploading}
            >
                {isUploading ? "Uploading..." : "Upload Document"}
            </button>

            {url && (
                <div style={{ marginTop: "20px" }}>
                    <h3>Document Preview:</h3>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        View Document
                    </a>
                </div>
            )}

            {submissionStatus && (
                <p
                    style={{
                        color: submissionStatus.includes("Error") ? "red" : "green",
                        marginTop: "10px",
                    }}
                >
                    {submissionStatus}
                </p>
            )}
        </div>
    );
}