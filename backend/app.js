import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import loanRoutes from './routes/loanRoutes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);

// 📌 Use the loan routes
app.use("/api/loans", loanRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
