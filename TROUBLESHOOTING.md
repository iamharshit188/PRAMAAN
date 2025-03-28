# Praman Troubleshooting Guide

This guide helps you diagnose and resolve common issues when using the Praman application, with a focus on Google Gemini API configuration problems.

## Google Gemini API Key Issues

### 1. "Invalid API key" Error

**Symptoms:**
- Error message stating "API key not valid" or "Invalid API key"
- Analysis requests fail immediately

**Possible Solutions:**
1. Verify you've copied the entire API key correctly
2. Check for extra spaces or line breaks in your .env file
3. Generate a new API key in Google AI Studio
4. Ensure you're using a Gemini API key (not a general Google Cloud API key)

### 2. "Model not found" Error

**Symptoms:**
- Error message stating "Model not found" or "404 not found"
- Analysis fails with specific references to the model endpoint

**Possible Solutions:**
1. Ensure the Gemini API is enabled in your Google Cloud Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Library"
   - Search for "Gemini API" and make sure it's enabled
2. Check if you need to enable the newer Gemini 1.5 model specifically
3. Verify your project has access to the specific model variant you're trying to use

### 3. Billing-Related Errors

**Symptoms:**
- Errors mentioning "billing required," "quota exceeded," or "billing not enabled"
- Analysis requests fail with billing-specific messages

**Possible Solutions:**
1. Set up billing in your Google Cloud Console:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "Billing"
   - Link a billing account to your project
2. Check your current quota usage in the Google Cloud Console
3. Consider upgrading to a paid tier if you've exceeded free limits
4. Verify your credit card hasn't expired if you already have billing set up

## Application-Specific Issues

### 1. Backend Connection Problems

**Symptoms:**
- "Failed to fetch" errors in the browser console
- Frontend shows connection errors

**Possible Solutions:**
1. Ensure the backend server is running (check terminal for errors)
2. Verify the ports match between your frontend and backend:
   - Backend typically runs on port 3000
   - Frontend typically connects to http://localhost:3000/api
3. Check CORS settings in your backend .env file

### 2. File Upload Issues

**Symptoms:**
- File uploads fail or hang
- Error messages about file type or size

**Possible Solutions:**
1. Make sure your file is a supported type (PDF, Excel)
2. Check file size is within reasonable limits (generally under 10MB)
3. Verify browser console for specific error messages
4. Try converting your file to a different format if possible

### 3. Analysis Fails with No Error

**Symptoms:**
- Upload appears successful but analysis never completes
- Loading spinner continues indefinitely

**Possible Solutions:**
1. Check browser console and network tab for error details
2. Verify backend logs for errors that might not be visible to the frontend
3. Try with a smaller, simpler file to see if complexity is an issue
4. Check if your API key has usage limits that have been reached

## Getting Additional Help

If you continue to experience issues after trying these solutions, please:

1. Check GitHub Issues for similar reported problems
2. Gather the following information before seeking help:
   - Complete error messages from the browser console
   - Backend terminal logs
   - API key status (valid, enabled, etc.)
   - File details if uploading (size, type, complexity)

---

Remember to never share your API key when asking for help. You can regenerate it if you suspect it's been compromised.