require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Import routes
const analyzeRoutes = require('./routes/analyze');
const chatRoutes = require('./routes/chat');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(morgan('dev')); // Logging
app.use(cors({
    origin: process.env.CORS_ORIGIN || "*",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes - Define them before static file serving
app.use('/api/analyze', analyzeRoutes);
app.use('/api/chat', chatRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'healthy',
        gemini: process.env.GEMINI_API_KEY ? 'configured' : 'missing'
    });
});

// Debug endpoint to check if the server is working
app.get('/api/debug', (req, res) => {
    res.json({
        message: 'Debug endpoint working',
        env: {
            nodeEnv: process.env.NODE_ENV,
            port: process.env.PORT,
            corsOrigin: process.env.CORS_ORIGIN,
            geminiConfigured: !!process.env.GEMINI_API_KEY
        },
        routes: {
            apiAnalyze: '/api/analyze/*',
            apiChat: '/api/chat',
            apiHealth: '/api/health'
        }
    });
});

// Serve static frontend in production - This should come after API routes
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));
    app.get('*', (req, res) => {
        // Skip API routes
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ error: 'API endpoint not found' });
        }
        res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
    });
} else {
    // In development, add a catch-all for non-API routes
    app.get('*', (req, res) => {
        if (req.path.startsWith('/api/')) {
            return res.status(404).json({ error: 'API endpoint not found' });
        }
        res.send('Backend server running in development mode.');
    });
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error in request:', req.method, req.url);
    console.error(err.stack);
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(`Gemini API: ${process.env.GEMINI_API_KEY ? 'Configured ✓' : 'Missing ✗'}`);
    console.log(`CORS Origin: ${process.env.CORS_ORIGIN || '*'}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('API Routes:');
    console.log('- /api/analyze/*');
    console.log('- /api/chat');
    console.log('- /api/health');
    console.log('- /api/debug');
}); 