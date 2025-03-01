// filepath: /f:/Oddo-X-Charusat-Hackathon-2025-1/backend/routes/loanRoutes.js
import express from "express";
import { submitLoanApplication, uploadDocuments, uploadMiddleware } from "../controllers/loanController.js";

const router = express.Router();

// 📌 Route to handle loan application submission
router.post("/apply-loan", submitLoanApplication);

// 📌 Route to handle document uploads
router.post("/upload-documents", uploadMiddleware, uploadDocuments);

export default router;