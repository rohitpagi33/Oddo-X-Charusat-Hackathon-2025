import mongoose from "mongoose";


const loanApplicationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    loanType: {
        type: String,
        required: true
    },
    signatureFileName: {
        type: String,
        required: true
    }
}, { timestamps: true });

export const LoanApplication = mongoose.model("LoanApplication", loanApplicationSchema);