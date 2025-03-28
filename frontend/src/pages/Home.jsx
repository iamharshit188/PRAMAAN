import React, { useState } from 'react';
import UploadForm from '../components/UploadForm';
import Dashboard from '../components/Dashboard';
import Chat from '../components/Chat';
import VisualAnalytics from '../components/VisualAnalytics';

const Home = () => {
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showVisualAnalytics, setShowVisualAnalytics] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalysisComplete = (result) => {
    setAnalysisResult(result);
    setError(null);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setAnalysisResult(null);
  };

  const toggleVisualAnalytics = () => {
    setShowVisualAnalytics(!showVisualAnalytics);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Partition 1: Left Panel */}
      <div className="lg:w-1/5 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4 text-blue-600">Analysis Tools</h2>
        <ul className="space-y-2">
          <li className="p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            Financial Reports
          </li>
          <li className="p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 000 2h10a1 1 0 100-2H3zm0 4a1 1 0 100 2h10a1 1 0 100-2H3z" clipRule="evenodd" />
            </svg>
            Balance Sheets
          </li>
          <li className="p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Income Statements
          </li>
          <li className="p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
            Cash Flow
          </li>
          <li className="p-2 hover:bg-blue-50 rounded cursor-pointer transition-colors flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 100 12A6 6 0 0010 4z" clipRule="evenodd" />
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
            Ratio Analysis
          </li>
        </ul>
        
        {analysisResult && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={toggleVisualAnalytics}
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11 4a1 1 0 10-2 0v4a1 1 0 102 0V7zm-3 1a1 1 0 10-2 0v3a1 1 0 102 0V8zM8 9a1 1 0 00-2 0v2a1 1 0 102 0V9z" clipRule="evenodd" />
              </svg>
              {showVisualAnalytics ? 'Hide Visual Analytics' : 'In-depth Visual Analytics'}
            </button>
          </div>
        )}
      </div>

      {/* Partition 2: Center Panel */}
      <div className="lg:w-2/5 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-blue-600">Financial Analysis</h2>
          </div>
          
          <UploadForm
            onAnalysisComplete={handleAnalysisComplete}
            onError={handleError}
            setLoading={setLoading}
          />
        </div>
        
        {loading && (
          <div className="flex justify-center items-center p-8 bg-white rounded-lg shadow-md">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="ml-3 text-blue-600">Processing your financial data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p>{error}</p>
            </div>
          </div>
        )}
        
        {analysisResult && !loading && (
          <Dashboard result={analysisResult} />
        )}
        
        {showVisualAnalytics && analysisResult && (
          <VisualAnalytics chartCode={analysisResult.chartCode} />
        )}
      </div>

      {/* Partition 3: Right Panel */}
      <div className="lg:w-2/5 bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Get Answers to your Questions</h2>
        <p className="text-gray-600 mb-4">Ask questions about your financial data and get instant insights.</p>
        <Chat analysisContext={analysisResult} />
      </div>
    </div>
  );
};

export default Home; 