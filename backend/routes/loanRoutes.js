// import express from "express";
// import { submitLoanApplication, uploadDocuments, uploadMiddleware } from "../controllers/loanController.js";

// const router = express.Router();

// // // 📌 Route to handle loan application submission
// // router.post("/apply-loan", submitLoanApplication);

// // // 📌 Route to handle document uploads
// // router.post("/upload-documents", uploadMiddleware, uploadDocuments);

// // export default router;




// // Handle loan application submission
// router.post('/apply-loan', (req, res) => {
//     const { name, amount, loanType } = req.body; // Expected fields

//     // Check if all fields are provided
//     if (!name || !amount || !loanType) {
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     // Process the loan application here (e.g., save to DB, etc.)
//     // For simplicity, we will just return a success message

//     res.status(200).json({ message: "Loan application submitted successfully" });
// });

// export default router;


import express from "express";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { LoanApplication } from "../models/LoanApplication.js"; // Assuming you have a LoanApplication model

const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../signatures'));
    },
    filename: (req, file, cb) => {
        const uniqueName = `${uuidv4()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

router.post('/apply-loan', upload.single('signature'), async (req, res) => {
    const { name, amount, loanType } = req.body; // Expected fields

    // Check if all fields are provided
    if (!name || !amount || !loanType) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "Signature is required" });
    }

    const signatureFileName = req.file.filename;

    try {
        const newLoanApplication = new LoanApplication({
            name,
            amount,
            loanType,
            signatureFileName
        });

        await newLoanApplication.save();

        res.status(200).json({ message: "Loan application submitted successfully" });
    } catch (error) {
        console.error("Error saving loan application:", error);
        res.status(500).json({ message: "Error saving loan application" });
    }
});

export default router;