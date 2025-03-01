import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Ensure signatures directory exists
const signatureDir = path.join(__dirname, "signatures");
if (!fs.existsSync(signatureDir)) {
    fs.mkdirSync(signatureDir);
}

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// LoanApplication Schema
const loanApplicationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        loanType: { type: String, required: true },
        signatureFileName: { type: String, required: true },
    },
    { timestamps: true }
);

const LoanApplication = mongoose.model("LoanApplication", loanApplicationSchema);

// Multer Setup with custom filename (signature-date.png)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, signatureDir);
    },
    filename: (req, file, cb) => {
        // Generate date in YYYY-MM-DD format
        const currentDate = new Date().toISOString().split("T")[0]; // e.g., "2025-03-01"
        const uniqueName = `signature-${currentDate}.png`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === "image/png") {
            cb(null, true);
        } else {
            cb(new Error("Only PNG files are allowed"), false);
        }
    },
});

// Loan Application Endpoint
app.post("/api/loans/apply-loan", upload.single("signature"), async (req, res) => {
    try {
        const { name, amount, loanType } = req.body;

        // Validate input fields
        if (!name || !amount || !loanType) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (!req.file) {
            return res.status(400).json({ message: "Signature is required" });
        }

        const signatureFileName = req.file.filename; // e.g., "signature-2025-03-01.png"

        // Save to MongoDB
        const newLoanApplication = new LoanApplication({
            name,
            amount,
            loanType,
            signatureFileName,
        });
        await newLoanApplication.save();

        res.status(200).json({ message: "Loan application submitted successfully" });
    } catch (error) {
        console.error("Error in /api/loans/apply-loan:", error);
        res.status(500).json({ message: "Error saving loan application", error: error.message });
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error("Unexpected error:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));