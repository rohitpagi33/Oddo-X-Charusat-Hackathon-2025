import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import loanRoutes from './routes/loanRoutes.js';
import fs from 'fs';  
import path from 'path';  

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);

// 📌 Use the loan routes
app.use("/api/loans", loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use(express.json({ limit: '10mb' }));

app.post('/save-signature', (req, res) => {
    const { image } = req.body;
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(__dirname, 'signatures', `signature-${new Date().toISOString().replace(/[:.]/g, '-')}.png`);

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error('Error saving signature:', err);
            return res.status(500).send('Error saving signature');
        }
        res.status(200).send('Signature saved successfully');
    });
});
