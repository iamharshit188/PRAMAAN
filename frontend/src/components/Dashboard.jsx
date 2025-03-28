import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = ({ result }) => {
  if (!result || !result.simplifiedStory) {
    return null;
  }

  // Check if this is an API key error
  const isApiKeyError = result.simplifiedStory.includes("API key") || 
                        result.simplifiedStory.includes("Gemini API") ||
                        result.simplifiedStory.includes("Error analyzing financial data");

  const exportToPDF = async () => {
    const doc = new jsPDF();
    const content = document.getElementById('analysis-content');

    try {
      // Add title
      doc.setFontSize(20);
      doc.text('Financial Analysis Report', 20, 20);

      // Add content sections
      let yOffset = 40;

      // Simplified Story
      doc.setFontSize(16);
      doc.text('Simplified Explanation', 20, yOffset);
      doc.setFontSize(12);
      const storyLines = doc.splitTextToSize(result.simplifiedStory, 170);
      doc.text(storyLines, 20, yOffset + 10);
      yOffset += 10 + (storyLines.length * 7);

      // Key Metrics
      if (result.keyMetrics && result.keyMetrics.length > 0) {
        yOffset += 10;
        doc.setFontSize(16);
        doc.text('Key Metrics', 20, yOffset);
        doc.setFontSize(12);
        yOffset += 10;
        
        result.keyMetrics.forEach((metric, index) => {
          const metricLines = doc.splitTextToSize(`${metric.name}: ${metric.value} - ${metric.significance || ''}`, 170);
          doc.text(metricLines, 20, yOffset);
          yOffset += metricLines.length * 7;
        });
      }

      // Recommendations
      if (result.recommendations) {
        yOffset += 10;
        doc.setFontSize(16);
        doc.text('Recommendations', 20, yOffset);
        doc.setFontSize(12);
        yOffset += 10;
        
        if (Array.isArray(result.recommendations)) {
          result.recommendations.forEach((rec, index) => {
            const recLines = doc.splitTextToSize(`${index + 1}. ${rec}`, 170);
            doc.text(recLines, 20, yOffset);
            yOffset += recLines.length * 7;
          });
        } else {
          const recLines = doc.splitTextToSize(result.recommendations, 170);
          doc.text(recLines, 20, yOffset);
        }
      }

      doc.save('financial-analysis.pdf');
    } catch (error) {
      console.error('Failed to export PDF:', error);
    }
  };

  // Helper function to get trend color class
  const getTrendColorClass = (trend) => {
    if (!trend) return 'text-gray-700';
    switch(trend.toLowerCase()) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      case 'neutral':
        return 'text-yellow-600';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div id="analysis-content" className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Analysis Results</h2>
        {!isApiKeyError && (
          <button
            onClick={exportToPDF}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export PDF
          </button>
        )}
      </div>

      {isApiKeyError ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-5 rounded mb-4">
          <div className="flex items-center mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold">Google Gemini API Setup Required</h3>
          </div>
          
          <div className="mb-4">
            <p className="mb-2">To use the Praman financial analysis features, you need to set up the Google Gemini API:</p>
            <p className="text-xs text-red-600 font-medium mb-2">Error message: {result.simplifiedStory}</p>
          </div>
          
          <h4 className="font-medium mb-2">Complete Setup Guide:</h4>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>Visit <a href="https://ai.google.dev/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google AI Studio</a> and sign in with your Google account</li>
            <li>Click on "Get API key" and create a new project if needed</li>
            <li>Copy your new API key</li>
            <li>Open your project's <code className="bg-yellow-50 p-1 rounded">backend-node/.env</code> file</li>
            <li>Replace <code className="bg-yellow-50 p-1 rounded">your_gemini_api_key_here</code> with your actual API key</li>
            <li>Visit <a href="https://console.cloud.google.com/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></li>
            <li>Ensure the Gemini API is enabled for your project</li>
            <li>Make sure billing is set up for your Google Cloud project (required for API usage)</li>
            <li>Restart the backend server</li>
            <li>Try your analysis again</li>
          </ol>
          
          <div className="mt-4 bg-yellow-50 p-3 rounded text-sm border border-yellow-200">
            <h5 className="font-medium mb-1">Troubleshooting Tips:</h5>
            <ul className="list-disc list-inside space-y-1">
              <li>Check that your API key doesn't have any extra spaces</li>
              <li>Ensure you're using a valid Google Cloud account with billing enabled</li>
              <li>The app is using the Gemini 1.5 Pro model, which might require specific permissions</li>
              <li>Read the <a href="https://ai.google.dev/docs/gemini_api_overview" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">official documentation</a> for detailed setup instructions</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2 text-blue-600">Simplified Story</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{result.simplifiedStory}</p>
            </div>
          </section>
          
          {result.keyMetrics && result.keyMetrics.length > 0 && (
            <section>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Key Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {result.keyMetrics.map((metric, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-medium">{metric.name}</p>
                    <p className={`text-lg font-bold ${getTrendColorClass(metric.trend)}`}>
                      {metric.value}
                    </p>
                    {metric.significance && (
                      <p className="text-sm text-gray-600 mt-1">{metric.significance}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
          
          {result.recommendations && (
            <section>
              <h3 className="text-lg font-semibold mb-2 text-blue-600">Recommendations</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {typeof result.recommendations === 'string' ? (
                    <li>{result.recommendations}</li>
                  ) : (
                    result.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))
                  )}
                </ul>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard; 