import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('Response error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout. Please try again.');
    }
    
    if (!error.response) {
      throw new Error('Network error. Please check your connection.');
    }
    
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        throw new Error(data.error || 'Invalid request');
      case 429:
        throw new Error('Too many requests. Please wait a moment and try again.');
      case 500:
        throw new Error('Server error. Please try again later.');
      case 503:
        throw new Error('Service temporarily unavailable. Please ensure the AI service is running.');
      default:
        throw new Error(data.error || 'An unexpected error occurred');
    }
  }
);

export const chatService = {
  // Send a chat message
  async sendMessage(message, sessionId = 'default', userId = null) {
    try {
      const response = await api.post('/chat', {
        message,
        sessionId,
        userId,
      });
      return response.data;
    } catch (error) {
      console.error('Chat service error:', error);
      throw error;
    }
  },

  // Get chat history
  async getChatHistory(sessionId = 'default') {
    try {
      const response = await api.get(`/chat/history/${sessionId}`);
      return response.data;
    } catch (error) {
      console.error('Chat history error:', error);
      throw error;
    }
  },

  // Get farming tips
  async getFarmingTips() {
    try {
      const response = await api.get('/tips');
      return response.data;
    } catch (error) {
      console.error('Tips service error:', error);
      throw error;
    }
  },

  // Health check
  async checkHealth() {
    try {
      const response = await api.get('/health');
      return response.data.status === 'healthy';
    } catch (error) {
      console.error('Health check error:', error);
      return false;
    }
  },
};

export default api;