# RAG Farmers Assistant - Full Stack Web Application

A complete web application for farming assistance powered by AI, featuring a React frontend, Node.js backend, and Python RAG system.

## 🏗️ Architecture

```
RAG-Farmers/
├── app.py                 # Python RAG API server
├── crop_guide.txt         # Knowledge base
├── Chroma_db/            # Vector database
└── web-app/
    ├── backend/          # Node.js/Express API
    │   ├── server.js
    │   ├── package.json
    │   └── .env.example
    └── frontend/         # React application
        ├── src/
        │   ├── components/
        │   ├── services/
        │   └── styles/
        └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### 1. Setup Python RAG System
```bash
cd RAG-Farmers
pip install -r requirements.txt
cp .env.example .env
# Add your GROQ_API_KEY to .env file
python app.py
# Choose option 1 (API Server)
```

### 2. Setup Node.js Backend
```bash
cd web-app/backend
npm install
cp .env.example .env
npm run dev
```

### 3. Setup React Frontend
```bash
cd web-app/frontend
npm install
npm start
```

## 🌐 Application URLs

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Python RAG API**: http://localhost:5000

## 📱 Features

### Frontend (React)
- 🎨 Modern, responsive UI with styled-components
- 💬 Real-time chat interface
- 📱 Mobile-friendly design
- 🌙 Clean, agricultural-themed styling
- ⚡ Fast and intuitive user experience
- 🔄 Real-time connection status
- 💡 Quick farming tips sidebar

### Backend (Node.js/Express)
- 🔌 RESTful API with rate limiting
- 🛡️ Security middleware (helmet, CORS)
- 📊 Request logging and monitoring
- 🔄 Automatic Python API integration
- ⚡ Fast response times with compression
- 🚦 Health check endpoints
- 📝 Comprehensive error handling

### Python RAG System
- 🤖 Advanced AI responses using Groq
- 📚 Vector database with Chroma
- 🌾 Farming-specific knowledge base
- 🔍 Intelligent query filtering
- 📄 Comprehensive logging
- 🛡️ Robust error handling

## 🔧 API Endpoints

### Backend API (Port 3001)
- `GET /api/health` - Health check
- `POST /api/chat` - Send chat message
- `GET /api/tips` - Get farming tips
- `GET /api/chat/history/:sessionId` - Get chat history

### Python API (Port 5000)
- `GET /health` - Health check
- `POST /query` - Process farming queries

## 🎯 Usage Examples

### Chat Interface
Users can ask questions like:
- "What's the best time to plant tomatoes?"
- "How do I control pests in my corn crop?"
- "What fertilizer should I use for wheat?"
- "Tell me about soil preparation"

### API Usage
```javascript
// Send a chat message
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: "How do I prepare soil for planting?",
    sessionId: "user-123"
  })
});

const data = await response.json();
console.log(data.message); // AI response
```

## 🔒 Environment Variables

### Backend (.env)
```
PORT=3001
PYTHON_API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
```

### Python (.env)
```
GROQ_API_KEY=your_groq_api_key_here
```

## 🛠️ Development

### Running in Development Mode
```bash
# Terminal 1: Python RAG API
cd RAG-Farmers
python app.py

# Terminal 2: Node.js Backend
cd web-app/backend
npm run dev

# Terminal 3: React Frontend
cd web-app/frontend
npm start
```

### Building for Production
```bash
# Build React frontend
cd web-app/frontend
npm run build

# The built files will be in the 'build' directory
# Serve them with your preferred web server
```

## 📦 Dependencies

### Backend
- express - Web framework
- cors - Cross-origin resource sharing
- axios - HTTP client
- helmet - Security middleware
- morgan - Request logging
- compression - Response compression

### Frontend
- react - UI library
- styled-components - CSS-in-JS styling
- axios - HTTP client
- react-icons - Icon library
- uuid - Unique ID generation

## 🔍 Troubleshooting

### Common Issues

1. **Python API not responding**
   - Ensure Python server is running on port 5000
   - Check GROQ_API_KEY is set correctly
   - Verify crop_guide.txt exists

2. **Backend connection errors**
   - Check if backend is running on port 3001
   - Verify environment variables are set
   - Check PYTHON_API_URL is correct

3. **Frontend build issues**
   - Run `npm install` to ensure dependencies
   - Check Node.js version (16+ required)
   - Clear npm cache if needed: `npm cache clean --force`

### Logs
- Backend logs: Console output
- Python logs: `farming_assistant.log`
- Frontend logs: Browser console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test all three components
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your farming applications!

## 🙏 Acknowledgments

- Groq for AI inference
- Chroma for vector database
- HuggingFace for embeddings
- React and Node.js communities