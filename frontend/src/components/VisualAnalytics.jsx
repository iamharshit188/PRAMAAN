import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const VisualAnalytics = ({ chartCode }) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (chartCode && chartContainer.current) {
      // Clean up any existing chart
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      try {
        // First, make sure chartCode is a valid object configuration 
        // If it's a string, try to convert it to an object
        let chartConfig;
        
        if (typeof chartCode === 'string') {
          // Remove any trailing semicolons that might cause Function to fail
          const cleanCode = chartCode.trim().replace(/;$/, '');
          
          // If it starts with a curly brace, it's likely a JSON object
          if (cleanCode.startsWith('{') && cleanCode.endsWith('}')) {
            try {
              // First attempt: direct eval which works for plain objects
              chartConfig = new Function(`return ${cleanCode}`)();
            } catch (evalError) {
              console.error('Error evaluating chart code:', evalError);
              // Second attempt: try JSON.parse for pure JSON strings
              try {
                chartConfig = JSON.parse(cleanCode);
              } catch (jsonError) {
                throw new Error('Failed to parse chart configuration');
              }
            }
          } else {
            throw new Error('Chart code is not in a valid format');
          }
        } else if (typeof chartCode === 'object') {
          // If it's already an object, use it directly
          chartConfig = chartCode;
        } else {
          throw new Error('Invalid chart code format');
        }

        // Create the chart
        const ctx = chartContainer.current.getContext('2d');
        chartInstance.current = new Chart(ctx, chartConfig);
        setError(null);
      } catch (error) {
        console.error('Error creating chart:', error);
        setError('Failed to render chart: ' + error.message);
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartCode]);

  if (!chartCode) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No chart data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Visual Analytics</h2>
      {error ? (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded mb-4">
          <p>{error}</p>
          <div className="mt-2 p-2 bg-gray-100 rounded overflow-auto text-xs">
            <pre>{typeof chartCode === 'string' ? chartCode : JSON.stringify(chartCode, null, 2)}</pre>
          </div>
        </div>
      ) : null}
      <div className="h-[400px] relative">
        <canvas ref={chartContainer} />
      </div>
      
      <div className="mt-6 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold text-gray-700 mb-2">Chart Details</h3>
        <p>This chart is generated based on the financial data you provided. For more detailed analysis, you can ask specific questions in the chat section.</p>
      </div>
    </div>
  );
};

export default VisualAnalytics; 