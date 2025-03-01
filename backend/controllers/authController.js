import { supabase } from "../config/supabaseClient.js";
import dotenv from "dotenv";
import twilio from "twilio"; // Twilio SDK
dotenv.config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// 📌 Send OTP
export const sendOTP = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

  if (!phoneNumber.startsWith('+91')) {
    phoneNumber = '+91' + phoneNumber;
  }

  try {
    // 📌 Check if the user already exists
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("phone_number")
      .eq("phone_number", phoneNumber)
      .single();

    if (userError && userError.code !== "PGRST116") {
      return res.status(500).json({ error: userError.message });
    }

    if (existingUser) {
      // 📌 If user already exists, don't send OTP
      return res.status(400).json({ error: "User already exists. OTP will not be sent." });
    }
    else{
    // 📌 Generate OTP only if the user does not exist
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("📌 Sending OTP to:", phoneNumber);

    // 📌 Insert new user into the database with OTP
    const { error: insertError } = await supabase
      .from("users")
      .insert([{ phone_number: phoneNumber, otp }]);

    if (insertError) return res.status(500).json({ error: insertError.message });

    // 📌 Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });

    res.json({ message: "OTP sent successfully" });
  }
  } catch (error) {
    console.error("🛑 Error sending OTP:", error);
    res.status(500).json({ error: error.message });
  }
};

// 📌 Verify OTP
export const verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) return res.status(400).json({ error: "All fields are required" });

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("phone_number", phoneNumber)
      .eq("otp", otp)
      .single();

    if (error || !data) return res.status(400).json({ error: "Invalid OTP" });

    // No JWT token, just return the user data
    res.json({ message: "OTP verified", user: data });
  } catch (error) {
    console.error("🛑 Error verifying OTP:", error);
    res.status(500).json({ error: error.message });
  }
};

// 📌 Register User (After OTP Verification)
export const registerUser = async (req, res) => {
  const { phoneNumber, name, panNumber } = req.body;
  if (!phoneNumber || !name || !panNumber)
    return res.status(400).json({ error: "All fields are required" });

  try {
    // Check if the user exists
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("phone_number", phoneNumber)
      .single();

    if (userError) {
      return res.status(500).json({ error: userError.message });
    }

    if (!existingUser) {
      // User does not exist, so insert the new user
      const { data: newUser, error: insertError } = await supabase
        .from("users")
        .insert([{ phone_number: phoneNumber, name, pan_number: panNumber }]);

      if (insertError) return res.status(500).json({ error: insertError.message });

      return res.json({ message: "User registered successfully", user: newUser });
    }

    // If user exists, update their details (name and pan_number)
    const { data: updatedUser, error: updateError } = await supabase
      .from("users")
      .update({ name, pan_number: panNumber })
      .eq("phone_number", phoneNumber);

    if (updateError) return res.status(500).json({ error: updateError.message });

    res.json({ message: "User details updated successfully", user: updatedUser });
  } catch (error) {
    console.error("🛑 Error registering/updating user:", error);
    res.status(500).json({ error: error.message });
  }
};

//Login
export const sendOTPForLogin = async (req, res) => {
  let { phoneNumber } = req.body;

  if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

  // 📌 Automatically add country code if not present
  if (!phoneNumber.startsWith('+91')) {
    // Assuming +91 as the default country code for India
    phoneNumber = '+91' + phoneNumber;
  }

  try {
    // 📌 Check if the user exists
    const { data: existingUser, error: userError } = await supabase
      .from("users")
      .select("phone_number")
      .eq("phone_number", phoneNumber)
      .single();

    if (userError && userError.code !== "PGRST116") {
      return res.status(500).json({ error: userError.message });
    }

    if (!existingUser) {
      // 📌 If user does not exist, return an error message
      return res.status(400).json({ error: "User does not exist. Please register first." });
    }
    else{
    // 📌 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
    console.log("📌 Sending OTP to:", phoneNumber);

    // 📌 Update OTP in the database
    const { error: updateError } = await supabase
      .from("users")
      .update({ otp })
      .eq("phone_number", phoneNumber);

    if (updateError) return res.status(500).json({ error: updateError.message });

    // 📌 Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP for login is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,  // Twilio phone number (must be a purchased Twilio number)
      to: phoneNumber  // User's phone number
    });

    res.json({ message: "OTP sent successfully for login" });
  }
  } catch (error) {
    console.error("🛑 Error sending OTP:", error);
    res.status(500).json({ error: error.message });
  }
};

// 📌 Verify OTP for Login
export const verifyOTPForLogin = async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) return res.status(400).json({ error: "Phone number and OTP are required" });

  try {
    // 📌 Check if the OTP matches the one in the database
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("phone_number, otp")
      .eq("phone_number", phoneNumber)
      .single();

    if (userError || !userData) {
      return res.status(400).json({ error: "User not found" });
    }

    if (userData.otp !== otp) {
      // 📌 OTP does not match
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // 📌 OTP is valid, login user
    // Optionally, you can return a session token or user data to log them in
    res.json({ message: "Login successful" });

  } catch (error) {
    console.error("🛑 Error verifying OTP:", error);
    res.status(500).json({ error: error.message });
  }
};
