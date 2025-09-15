# RAG-Farmers Assistant Setup Guide

## 🌾 Welcome to Your Farming Assistant!

This application provides intelligent farming assistance using RAG (Retrieval Augmented Generation) technology.

## 📋 Prerequisites

1. **Python 3.8+** installed
2. **Groq API Key** (get from https://console.groq.com/)
3. **crop_guide.txt** file with farming knowledge

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Environment Setup
Create a `.env` file in the project directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Prepare Data
Ensure `crop_guide.txt` is in the project directory with your farming knowledge base.

### 4. Run the Application
```bash
python app.py
```

## 🎯 Features

### ✅ **Smart Filtering**
- Only responds to farming/agriculture questions
- Allows greetings, thanks, and follow-up requests
- Politely redirects non-farming questions

### ✅ **Two Modes**
1. **API Mode**: REST API server for integration
2. **Interactive Mode**: Direct chat interface

### ✅ **Enhanced Functionality**
- Comprehensive error handling
- Logging system
- Health check endpoint
- Conversation context awareness

## 🌐 API Endpoints

### POST /query
Send farming questions:
```json
{
  "query": "How do I control pests in corn?"
}
```

### GET /health
Check system status

## 💬 Interactive Commands

- **Farming questions**: Ask anything about agriculture
- **Follow-ups**: "more", "tell me more", "elaborate"
- **Greetings**: "hello", "hi", "good morning"
- **Exit**: "exit", "quit", "bye"

## 🔧 Troubleshooting

### Common Issues:
1. **GROQ_API_KEY not set**: Check your .env file
2. **crop_guide.txt not found**: Ensure file exists in project directory
3. **Import errors**: Run `pip install -r requirements.txt`

### Logs:
Check `farming_assistant.log` for detailed error information.

## 📁 Project Structure
```
RAG-Farmers/
├── app.py                 # Main application
├── crop_guide.txt         # Knowledge base
├── .env                   # Environment variables
├── requirements.txt       # Dependencies
├── test_filtering.py      # Test script
├── farming_assistant.log  # Log file
└── Chroma_db/            # Vector database
```

## 🤝 Support

For issues or questions, check the logs or review the error messages in the console.

Happy Farming! 🌱