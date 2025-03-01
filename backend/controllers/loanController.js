import { supabase } from "../config/supabaseClient.js";
import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const submitLoanApplication = async (req, res) => {
  const { loanType, loanAmount, loanTenure, monthlyIncome, employmentType } = req.body;

  if (!loanType || !loanAmount || !loanTenure || !monthlyIncome || !employmentType) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data, error } = await supabase.from("loan_applications").insert([
      {
        loan_type: loanType,
        loan_amount: loanAmount,
        loan_tenure: loanTenure,
        monthly_income: monthlyIncome,
        employment_type: employmentType,
      },
    ]);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ message: "Application submitted successfully", data });
  } catch (error) {
    console.error("Error submitting loan application:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadDocuments = async (req, res) => {
  const { files } = req;
  const { aadharFile, panFile, passbookFile, statementFile } = files;

  try {
    const uploadFile = async (file, fileName) => {
      const { data, error } = await supabase.storage
        .from("documents")
        .upload(`documents/${fileName}`, file.buffer, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      return data;
    };

    const aadharData = await uploadFile(aadharFile[0], `aadhar-${Date.now()}${path.extname(aadharFile[0].originalname)}`);
    const panData = await uploadFile(panFile[0], `pan-${Date.now()}${path.extname(panFile[0].originalname)}`);
    const passbookData = await uploadFile(passbookFile[0], `passbook-${Date.now()}${path.extname(passbookFile[0].originalname)}`);
    const statementData = await uploadFile(statementFile[0], `statement-${Date.now()}${path.extname(statementFile[0].originalname)}`);

    return res.status(200).json({
      message: "Documents uploaded successfully",
      aadharData,
      panData,
      passbookData,
      statementData,
    });
  } catch (error) {
    console.error("Error uploading documents:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const uploadMiddleware = upload.fields([
  { name: "aadharFile", maxCount: 1 },
  { name: "panFile", maxCount: 1 },
  { name: "passbookFile", maxCount: 1 },
  { name: "statementFile", maxCount: 1 },
]);