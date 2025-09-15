const express = require('express');
const cors = require('cors');
const axios = require('axios');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;
const PYTHON_API_URL = process.env.PYTHON_API_URL || 'http://localhost:5000';

// Rate limiting
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 30, // limit each IP to 30 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/', limiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'KisaanSahayak Backend',
    timestamp: new Date().toISOString(),
    python_api: PYTHON_API_URL
  });
});

// Chat endpoint - communicates with Python RAG system
app.post('/api/chat', async (req, res) => {
  try {
    const { message, sessionId, userId } = req.body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({
        error: 'Message is required and must be a non-empty string',
        code: 'INVALID_MESSAGE'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        error: 'Message too long. Please keep it under 1000 characters.',
        code: 'MESSAGE_TOO_LONG'
      });
    }

    // Forward request to Python RAG API with user context
    console.log(`User ${userId || 'anonymous'} - Forwarding message: ${message.substring(0, 50)}...`);
    
    const pythonResponse = await axios.post(`${PYTHON_API_URL}/query`, {
      query: message.trim(),
      session_id: sessionId,
      user_id: userId
    }, {
      timeout: 30000, // 30 second timeout
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Process response from Python API
    const { answer, type } = pythonResponse.data;

    res.json({
      message: answer,
      type: type || 'response',
      sessionId: sessionId || 'default',
      timestamp: new Date().toISOString(),
      model: 'KisaanSahayak'
    });

  } catch (error) {
    console.error('Chat API Error:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: 'AI service is temporarily unavailable. Please ensure the Python RAG server is running.',
        code: 'SERVICE_UNAVAILABLE'
      });
    }

    if (error.response?.status === 400) {
      return res.status(400).json({
        error: error.response.data?.error || 'Invalid request to AI service',
        code: 'INVALID_REQUEST'
      });
    }

    if (error.code === 'ENOTFOUND' || error.code === 'ECONNRESET') {
      return res.status(503).json({
        error: 'Cannot connect to AI service. Please check if the Python server is running.',
        code: 'CONNECTION_ERROR'
      });
    }

    res.status(500).json({
      error: 'Internal server error. Please try again later.',
      code: 'INTERNAL_ERROR'
    });
  }
});

// Get farming tips endpoint
app.get('/api/tips', async (req, res) => {
  try {
    const tips = [
      "Plant tomatoes after the last frost date in your area for best results.",
      "Rotate your crops each season to maintain soil health and prevent pest buildup.",
      "Water plants early in the morning to reduce evaporation and disease risk.",
      "Compost organic matter to create nutrient-rich soil for your crops.",
      "Use companion planting to naturally repel pests and improve crop yields."
    ];

    res.json({
      tips: tips,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Tips API Error:', error.message);
    res.status(500).json({
      error: 'Failed to fetch farming tips',
      code: 'TIPS_ERROR'
    });
  }
});

// Chat history endpoint (mock for now)
app.get('/api/chat/history/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  
  // In a real app, this would fetch from a database
  res.json({
    sessionId,
    messages: [],
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    error: 'Something went wrong!',
    code: 'UNHANDLED_ERROR'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    code: 'NOT_FOUND'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🌾 KisaanSahayak Backend Server running on port ${PORT}`);
  console.log(`🔗 Python API URL: ${PYTHON_API_URL}`);
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;