require('dotenv').config();
const axios = require('axios');

// Gemini API configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// Updated to use the newer stable API endpoint
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent';

// Check if API key is valid
if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
  console.error('⚠️ Invalid or missing Gemini API key. Please set a valid API key in your .env file.');
}

// Helper function to generate Gemini API content
const generateContent = async (prompt) => {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      throw new Error('Invalid or missing Gemini API key');
    }

    console.log('Making request to Gemini API...');
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8000
        }
      }
    );
    
    if (!response.data?.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected Gemini API response structure:', JSON.stringify(response.data));
      throw new Error('Unexpected response format from Gemini API');
    }

    return response.data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Gemini API error:', error.response?.data || error.message);
    
    // Handle specific API errors with more helpful messages
    if (error.response?.data?.error?.message) {
      const errorMsg = error.response.data.error.message;
      
      if (errorMsg.includes('API key not valid')) {
        throw new Error('Your Gemini API key is invalid. Please check your .env file and update it with a valid key.');
      } else if (errorMsg.includes('not found for API version')) {
        throw new Error('The Gemini model endpoint is not available. This might be due to an outdated API or model name.');
      } else if (errorMsg.includes('billing')) {
        throw new Error('Billing issue with your Google Cloud account. Please ensure billing is enabled for your project.');
      }
    }
    
    throw new Error(`Failed to generate content from Gemini API: ${error.message}`);
  }
};

// Controller methods
exports.analyzeFinancialText = async (text) => {
  const prompt = `
    Take the detailed financial report provided, which includes technical terms, specific financial metrics, and industry jargon, and convert it into plain, everyday language that anyone can understand. Make sure to extract and explain every key detail from the report—including growth rates, risk indicators, red flags such as high non-performing assets, aggressive lending practices, underreported risks, poor governance issues, and any other financial metrics. Your simplified version should clearly explain what these details mean about the company's (or bank's/brand's) current situation and future outlook, using relatable analogies where appropriate. The explanation should be generic enough to apply to any company, brand, bank, or business, and it should guide the reader on whether to approach the company with caution or confidence.
    1. A simplified story explaining what this data means in plain language without technical jargon.
    2. Key metrics and their significance and if Monetary values it should be in proper Rupees only, extracted as JSON in the format: [{"name": "Metric Name", "value": "Value", "trend": "positive/negative/neutral", "significance": "Brief explanation"}]
    3. Actionable recommendations based on this data
    4. Chart.js code (version 3) to visualize key aspects of this data. Make the chart visually appealing and insightful.

    IMPORTANT: For the chart code, you must provide a valid Chart.js configuration object that:
    - Starts with opening curly brace and ends with closing curly brace
    - Contains type, data, and options properties
    - Sets responsive: true and maintainAspectRatio: false in options
    - Uses proper quotes and formatting
    - No semicolons, variable declarations, or Chart constructor calls
    
    Format your response as follows:
    
    # Simplified Story
    [Provide the simplified explanation here]
    
    # Key Metrics
    [JSON array of key metrics as specified above]
    
    # Recommendations
    - [Recommendation 1]
    - [Recommendation 2]
    - [etc.]
    
    # Chart Code
    \`\`\`javascript
    {
      type: 'bar',
      data: {
        labels: ['Label1', 'Label2'],
        datasets: [{
          label: 'Data',
          data: [value1, value2],
          backgroundColor: ['rgba(75, 192, 192, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Chart Title'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    }
    \`\`\`

    Financial data:
    ${text}
  `;

  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return {
        simplifiedStory: "ERROR: Please configure a valid Gemini API key in your .env file to analyze financial data.",
        keyMetrics: [{
          name: "API Configuration", 
          value: "Missing", 
          trend: "negative", 
          significance: "The application requires a valid Google Gemini API key to function."
        }],
        recommendations: [
          "Set up a Google Cloud account if you don't have one",
          "Generate a Gemini API key at https://ai.google.dev/",
          "Add the key to your .env file as GEMINI_API_KEY=your_actual_key",
          "Make sure you've enabled the Gemini API in your Google Cloud Console",
          "Restart the server"
        ],
        chartCode: `{
          type: 'bar',
          data: {
            labels: ['API Key Status'],
            datasets: [{
              label: 'Configuration Status',
              data: [0],
              backgroundColor: ['rgba(255, 99, 132, 0.5)'],
              borderColor: ['rgba(255, 99, 132, 1)'],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }`
      };
    }

    const response = await generateContent(prompt);
    
    // Extract simplified story
    let simplifiedStory = "";
    const storyMatch = response.match(/# Simplified Story\s+([\s\S]*?)(?=# Key Metrics|$)/);
    if (storyMatch && storyMatch[1]) {
      simplifiedStory = storyMatch[1].trim();
    }
    
    // Extract key metrics as JSON
    let keyMetrics = [];
    const metricsMatch = response.match(/# Key Metrics\s+([\s\S]*?)(?=# Recommendations|$)/);
    if (metricsMatch && metricsMatch[1]) {
      try {
        // Look for JSON array in the metrics section
        const jsonMatch = metricsMatch[1].match(/\[\s*\{[\s\S]*\}\s*\]/);
        if (jsonMatch) {
          keyMetrics = JSON.parse(jsonMatch[0]);
        }
      } catch (err) {
        console.error('Error parsing metrics JSON:', err);
      }
    }
    
    // Extract recommendations
    let recommendations = [];
    const recommendationsMatch = response.match(/# Recommendations\s+([\s\S]*?)(?=# Chart Code|$)/);
    if (recommendationsMatch && recommendationsMatch[1]) {
      recommendations = recommendationsMatch[1]
        .split('\n')
        .filter(line => line.trim().startsWith('-') || line.trim().startsWith('•'))
        .map(line => line.replace(/^[•-]\s*/, '').trim())
        .filter(Boolean);
    }
    
    // Extract chart code
    let chartCode = null;
    const chartCodeMatch = response.match(/```(?:js|javascript)([\s\S]*?)```/);
    if (chartCodeMatch && chartCodeMatch[1]) {
      // Clean and validate the chart code
      const extractedCode = chartCodeMatch[1].trim();
      
      // Remove any trailing semicolons that might cause Function to fail
      chartCode = extractedCode.replace(/;$/, '');
      
      // Ensure it starts with a proper Chart.js configuration
      if (!chartCode.startsWith('{') || !chartCode.includes('type:')) {
        console.warn('Retrieved chart code may not be a valid Chart.js configuration, adding fallback');
        // Provide a fallback chart configuration
        chartCode = `{
          type: 'bar',
          data: {
            labels: ['Data Point 1', 'Data Point 2', 'Data Point 3'],
            datasets: [{
              label: 'Financial Data',
              data: [12, 19, 3],
              backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
              borderColor: ['rgba(75, 192, 192, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
              borderWidth: 1
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Financial Data Overview'
              }
            },
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        }`;
      }
    } else {
      console.warn('No chart code found in the API response');
      // Provide a default chart if none is found
      chartCode = `{
        type: 'bar',
        data: {
          labels: ['Financial Data'],
          datasets: [{
            label: 'Financial Overview',
            data: [10],
            backgroundColor: ['rgba(54, 162, 235, 0.5)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Default Chart - No data available'
            }
          },
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      }`;
    }

    return {
      simplifiedStory,
      keyMetrics,
      recommendations: recommendations.length > 0 ? recommendations : null,
      chartCode
    };
  } catch (error) {
    console.error('Analysis error:', error);
    return {
      simplifiedStory: `Error analyzing financial data: ${error.message}`,
      keyMetrics: [{
        name: "Error", 
        value: error.message, 
        trend: "negative", 
        significance: "There was an error processing your request."
      }],
      recommendations: [
        "Verify your Gemini API key is correct",
        "Make sure you've enabled the Gemini API in your Google Cloud Console",
        "Check that billing is enabled for your Google Cloud project",
        "Try again after fixing these potential issues"
      ],
      chartCode: null
    };
  }
};

exports.handleChatMessage = async (message, context) => {
  try {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return {
        message: "ERROR: Please configure a valid Gemini API key in your .env file to use the chat functionality."
      };
    }

    let prompt = `You are a helpful financial assistant answering questions about financial data. Keep your answers clear, precise, and avoid technical jargon when possible.
      
      Question: ${message}`;
    
    if (context && context.simplifiedStory) {
      prompt += `\n\nContext from previous financial analysis: ${context.simplifiedStory}`;
    }
    
    if (context && context.keyMetrics && context.keyMetrics.length > 0) {
      prompt += `\n\nKey metrics from the analysis: ${JSON.stringify(context.keyMetrics)}`;
    }
    
    if (context && context.recommendations && context.recommendations.length > 0) {
      prompt += `\n\nRecommendations from the analysis: ${context.recommendations.join(', ')}`;
    }
    
    const responseText = await generateContent(prompt);
    
    return {
      message: responseText
    };
  } catch (error) {
    console.error('Chat error:', error);
    return {
      message: `Error: ${error.message}`
    };
  }
}; 