const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse');
const ExcelJS = require('exceljs');
const geminiController = require('../controllers/geminiController');

// Configure multer for file uploads
const upload = multer({
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

// Analyze text directly
router.post('/text', async (req, res) => {
  try {
    const { text } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'No text provided' });
    }
    
    const result = await geminiController.analyzeFinancialText(text);
    res.json(result);
  } catch (error) {
    console.error('Error analyzing text:', error);
    res.status(500).json({ error: 'Failed to analyze text' });
  }
});

// Analyze PDF
router.post('/pdf', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No PDF file uploaded' });
    }
    
    // Extract text from PDF
    const pdfData = await pdfParse(req.file.buffer);
    const text = pdfData.text;
    
    // Analyze the extracted text
    const result = await geminiController.analyzeFinancialText(text);
    res.json(result);
  } catch (error) {
    console.error('Error analyzing PDF:', error);
    res.status(500).json({ error: 'Failed to analyze PDF' });
  }
});

// Analyze Excel
router.post('/excel', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No Excel file uploaded' });
    }
    
    // Extract data from Excel
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(req.file.buffer);
    
    let extractedText = '';
    
    // Process each worksheet
    workbook.eachSheet((worksheet) => {
      // Add worksheet name
      extractedText += `Worksheet: ${worksheet.name}\n\n`;
      
      // Extract headers
      const headers = [];
      worksheet.getRow(1).eachCell((cell) => {
        headers.push(cell.value);
      });
      
      // Extract data in a tabular format
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return; // Skip header row
        
        const rowData = [];
        row.eachCell((cell, colNumber) => {
          rowData.push(`${headers[colNumber-1]}: ${cell.value}`);
        });
        
        extractedText += rowData.join(' | ') + '\n';
      });
      
      extractedText += '\n\n';
    });
    
    // Analyze the extracted text
    const result = await geminiController.analyzeFinancialText(extractedText);
    res.json(result);
  } catch (error) {
    console.error('Error analyzing Excel:', error);
    res.status(500).json({ error: 'Failed to analyze Excel file' });
  }
});

module.exports = router; 