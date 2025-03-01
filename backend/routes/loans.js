// server.js or routes/loans.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const router = express.Router();

// Supabase configuration
const supabaseUrl = 'your-supabase-url';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Files will be saved in the uploads folder
  },
  filename: (req, file, cb) => {
    // Generate unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit, adjust as needed
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|jpg|jpeg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only PDF, JPG, and PNG files are allowed'));
  }
});

// Loan application route
router.post('/api/loans/apply-loan', upload.array('documents'), async (req, res) => {
  try {
    const { loanType, loanAmount, loanTenure, monthlyIncome, employmentType } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No documents uploaded' });
    }

    // Prepare document filenames for database
    const documentNames = files.map(file => ({
      filename: file.filename,
      originalName: file.originalname,
      path: file.path,
      size: file.size
    }));

    // Insert loan application into Supabase
    const { data, error } = await supabase
      .from('loan_applications')
      .insert({
        loan_type: loanType,
        loan_amount: parseFloat(loanAmount),
        loan_tenure: parseInt(loanTenure),
        monthly_income: parseFloat(monthlyIncome),
        employment_type: employmentType,
        documents: documentNames,
        created_at: new Date().toISOString(),
        status: 'pending'
      })
      .select()
      .single();

    if (error) {
      // If database insert fails, you might want to delete the uploaded files
      throw error;
    }

    res.status(200).json({
      message: 'Loan application submitted successfully',
      application: data
    });

  } catch (error) {
    console.error('Error processing loan application:', error);
    res.status(500).json({
      error: 'Failed to process loan application',
      details: error.message
    });
  }
});

// Create uploads folder if it doesn't exist
const fs = require('fs');
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

module.exports = router;