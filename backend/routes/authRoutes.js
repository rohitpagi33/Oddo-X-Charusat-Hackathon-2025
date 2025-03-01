import express from "express";
import { sendOTP, verifyOTP, registerUser, sendOTPForLogin, verifyOTPForLogin } from "../controllers/authController.js";

const router = express.Router();

//register
router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/register", registerUser);

//login
router.post("/send-otp-login", sendOTPForLogin);
router.post("/verify-otp-login", verifyOTPForLogin);

export default router;