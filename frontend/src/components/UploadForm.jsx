import React, { useState } from 'react';
import api from '../services/api';

const UploadForm = ({ onAnalysisComplete, onError, setLoading }) => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [fileType, setFileType] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (fileExtension === 'pdf' || fileExtension === 'xlsx' || fileExtension === 'xls') {
      setFile(selectedFile);
      setFileType(fileExtension === 'pdf' ? 'pdf' : 'excel');
      setText('');
    } else {
      onError('Please upload a PDF or Excel file');
      setFile(null);
    }
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
    setFile(null);
    setFileType('');
  };

  const checkForApiKeyErrors = (result) => {
    if (!result) return false;
    
    const apiKeyErrors = [
      "Please configure a valid Gemini API key",
      "API key not valid",
      "Invalid or missing Gemini API key",
      "Gemini API key is invalid",
      "billing issue",
      "API Configuration"
    ];
    
    if (result.simplifiedStory) {
      return apiKeyErrors.some(errorText => 
        result.simplifiedStory.toLowerCase().includes(errorText.toLowerCase())
      );
    }
    
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file && !text) {
      onError('Please upload a file or enter text to analyze');
      return;
    }

    if (isProcessing) {
      return; // Prevent multiple submissions
    }

    setIsProcessing(true);
    setLoading(true);
    
    try {
      let result;
      if (file) {
        if (fileType === 'pdf') {
          result = await api.analyzePDF(file);
        } else if (fileType === 'excel') {
          result = await api.analyzeExcel(file);
        }
      } else if (text) {
        result = await api.analyzeText(text);
      }
      
      // Check if the result contains an API key error
      if (checkForApiKeyErrors(result)) {
        onError("Google Gemini API Setup Required: The application needs a valid Google Gemini API key to function. Please check the backend-node/.env file and follow the setup instructions.");
      } else {
        onAnalysisComplete(result);
      }
    } catch (error) {
      console.error('Error during analysis:', error);
      
      // Check if it's an API key error
      if (error.message && (
          error.message.includes("API key") || 
          error.message.includes("Gemini API") ||
          error.message.includes("404") ||
          error.message.includes("billing") ||
          error.message.includes("model not found")
        )) {
        onError("Google Gemini API Setup Issue: The backend needs a valid Google Gemini API key. Please check the backend-node/.env file for detailed setup instructions.");
      } else {
        onError(error.message || 'Failed to analyze the document');
      }
    } finally {
      setLoading(false);
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Upload financial document</span>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.xlsx,.xls"
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-medium
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </label>
        
        {file && (
          <p className="text-sm text-gray-700 mt-2">
            Selected file: <span className="font-medium">{file.name}</span>
          </p>
        )}
        
        <p className="text-gray-500 text-sm mt-2">Supported file types: PDF, Excel</p>
      </div>
      
      <div>
        <label className="block">
          <span className="text-gray-700 font-medium">Or paste text directly</span>
          <textarea
            value={text}
            onChange={handleTextChange}
            rows="6"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            placeholder="Paste your financial data here..."
          ></textarea>
        </label>
      </div>
      
      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-2 px-4 ${isProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 transition-colors flex items-center justify-center`}
      >
        {isProcessing ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </>
        ) : (
          'Analyze'
        )}
      </button>
    </form>
  );
};

export default UploadForm;