import { supabase } from "../config/supabaseClient.js";

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
