import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// Log the API URL to help with debugging
console.log('Using API URL:', API_URL);

const api = {
  // Upload and analyze PDF file
  async analyzePDF(file) {
    try {
      console.log('Uploading PDF file:', file.name);
      
      const formData = new FormData();
      formData.append('file', file);

      const url = `${API_URL}/analyze/pdf`;
      console.log('POST request to:', url);
      
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error analyzing PDF:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      console.error('Status code:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      throw new Error(`Failed to analyze PDF: ${error.response?.status}: ${error.message}`);
    }
  },

  // Upload and analyze Excel file
  async analyzeExcel(file) {
    try {
      console.log('Uploading Excel file:', file.name);
      
      const formData = new FormData();
      formData.append('file', file);

      const url = `${API_URL}/analyze/excel`;
      console.log('POST request to:', url);
      
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      return response.data;
    } catch (error) {
      console.error('Error analyzing Excel:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      console.error('Status code:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      throw new Error(`Failed to analyze Excel file: ${error.response?.status}: ${error.message}`);
    }
  },

  // Analyze text input
  async analyzeText(text) {
    try {
      console.log('Analyzing text, length:', text.length);
      
      const url = `${API_URL}/analyze/text`;
      console.log('POST request to:', url);
      
      const response = await axios.post(url, { text });
      return response.data;
    } catch (error) {
      console.error('Error analyzing text:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      console.error('Status code:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      throw new Error(`Failed to analyze text: ${error.response?.status}: ${error.message}`);
    }
  },

  // Send chat message
  async sendChatMessage(message, context) {
    try {
      console.log('Sending chat message:', message);
      
      const url = `${API_URL}/chat`;
      console.log('POST request to:', url);
      
      const response = await axios.post(url, { 
        message,
        context
      });
      return response.data;
    } catch (error) {
      console.error('Error sending chat message:', error);
      console.error('Error details:', error.response?.data || 'No response data');
      console.error('Status code:', error.response?.status);
      console.error('Headers:', error.response?.headers);
      throw new Error(`Failed to send chat message: ${error.response?.status}: ${error.message}`);
    }
  }
};

export default api; 