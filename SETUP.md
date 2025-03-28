# Praman Setup Guide

This guide provides detailed instructions for setting up the Praman application, with a special focus on configuring the Google Gemini API, which is essential for the application's AI capabilities.

## Prerequisites

- Node.js 14+ installed on your system
- Git for cloning the repository
- A Google account for Gemini API access
- Basic familiarity with terminal/command prompt

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/praman.git
cd praman
```

## Step 2: Setting up Google Gemini API

The most critical part of setting up Praman is configuring a valid Google Gemini API key. Follow these steps carefully:

### Obtaining a Google Gemini API Key

1. **Visit Google AI Studio:**
   - Go to [Google AI Studio](https://ai.google.dev/)
   - Sign in with your Google account

2. **Create an API Key:**
   - Navigate to the API Keys section
   - Click "Create API Key"
   - Copy the generated API key to a secure location

3. **Enable the Gemini API in Google Cloud Console:**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select an existing one
   - In the search bar, type "Gemini API" and select it from results
   - Click "Enable" to activate the API for your project

4. **Set Up Billing (Required for Gemini 1.5 Pro):**
   - In Google Cloud Console, navigate to Billing
   - Set up a billing account if you don't have one
   - Link your billing account to your project
   - Note: The free tier includes a generous allowance, but billing info is required

## Step 3: Backend Configuration

1. **Install Dependencies:**
   ```bash
   cd backend-node
   npm install
   ```

2. **Configure Environment Variables:**
   ```bash
   cp .env.example .env
   ```

3. **Edit the .env File:**
   Open the .env file in a text editor and add your Gemini API key:
   ```
   PORT=3000
   NODE_ENV=development
   CORS_ORIGIN=http://localhost:5173
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Replace `your_gemini_api_key_here` with the API key you obtained earlier.

## Step 4: Frontend Configuration

1. **Install Dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

2. **Create Environment File (if needed):**
   The frontend should work with the default configuration pointing to `http://localhost:3000/api`. If you need to customize:
   ```bash
   cp .env.example .env
   ```

## Step 5: Starting the Application

1. **Start the Backend Server:**
   ```bash
   cd ../backend-node
   npm start
   ```

2. **Start the Frontend Development Server:**
   ```bash
   # In a new terminal
   cd ../frontend
   npm run dev
   ```

3. **Access the Application:**
   Open your browser and navigate to http://localhost:5173

## Troubleshooting Common Issues

### API Key Problems

1. **Error: "API key not valid"**
   - Double-check that you've copied the entire API key correctly
   - Ensure there are no extra spaces before or after the key in .env
   - Regenerate a new API key if issues persist

2. **Error: "Model not found"**
   - Verify that the Gemini API is enabled in your Google Cloud Console
   - Make sure you've completed all steps in the Google Cloud setup
   - Check if you're using the correct model version in your configuration

3. **Error: "Billing required" or "Quota exceeded"**
   - Confirm your billing is properly set up in Google Cloud Console
   - Check your quota usage and limits in the Google Cloud Console
   - Consider upgrading your plan if you've exceeded free tier limits

### Application Issues

1. **Backend fails to start:**
   - Check for error messages in the console
   - Verify that port 3000 is not being used by another application
   - Ensure all dependencies were installed correctly

2. **Frontend fails to connect to backend:**
   - Confirm the backend is running
   - Check that CORS_ORIGIN in backend .env matches your frontend URL
   - Verify that the API URL in frontend configuration is correct

3. **File uploads not working:**
   - Check browser console for errors
   - Ensure your file meets the size and type requirements
   - Verify that the backend upload directory has proper write permissions

## Getting Help

If you continue to experience issues after following this guide, please:

1. Check the GitHub issues section for similar problems and solutions
2. Search for specific error messages online
3. Create a new issue with detailed information about your problem

---

Remember to never share your API keys publicly or commit them to version control systems! 