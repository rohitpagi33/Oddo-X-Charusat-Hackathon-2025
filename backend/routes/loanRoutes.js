import express from "express";
import { submitLoanApplication } from "../controllers/loanController.js";

const router = express.Router();

// 📌 Route to handle loan application submission
router.post("/apply-loan", submitLoanApplication);

export default router;