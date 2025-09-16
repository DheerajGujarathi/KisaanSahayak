# 🌾 KisaanSahayak - AI-Powered Farming Assistant

<div align="center">

![KisaanSahayak Welcome](./images/welcome-screen.png)

**An intelligent, full-stack web application that provides personalized farming assistance using RAG (Retrieval Augmented Generation) technology**

[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green.svg)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express-4.18+-lightgrey.svg)](https://expressjs.com)

</div>

## � Overview

KisaanSahayak is a comprehensive farming assistant that combines the power of AI with modern web technologies to provide farmers with instant, accurate, and contextual farming advice. Built with a React frontend, Node.js backend, and Python AI engine, it offers an intuitive chat interface with persistent conversation history.

## ✨ Key Features

### 🤖 **AI-Powered Intelligence**
- **RAG Technology**: Uses Retrieval Augmented Generation for accurate, context-aware responses
- **Smart Domain Filtering**: Only responds to farming and agriculture-related questions
- **Groq LLM Integration**: Powered by high-performance language models
- **Vector Database**: ChromaDB for efficient knowledge retrieval

### 💬 **Modern Chat Interface**
![Chat Interface](./images/chat-interface.png)
- **Real-time Messaging**: Instant responses with typing indicators
- **Persistent Chat History**: Conversations saved across sessions
- **Intuitive UI**: Clean, colorful, and farmer-friendly design
- **Responsive Design**: Works seamlessly on desktop and mobile

### 📚 **Chat History Management**
![Chat History Sidebar](./images/chat-history-sidebar.png)
- **Session Tracking**: Organized chat sessions with timestamps
- **Quick Access**: Easily browse and revisit previous conversations
- **Export Functionality**: Download chat history for reference
- **Search & Filter**: Find specific conversations quickly

### 🌐 **Full-Stack Architecture**
- **React Frontend**: Modern, component-based UI with styled-components
- **Node.js Backend**: RESTful API server with Express.js
- **Python AI Engine**: Advanced RAG pipeline with LangChain
- **Single-User Focus**: Streamlined experience for individual farmers

## �️ Tech Stack

### Frontend
- **React 18+** - Modern UI framework
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API calls
- **React Hooks** - State management

### Backend
- **Node.js & Express** - API server
- **CORS** - Cross-origin resource sharing
- **Body Parser** - JSON request handling

### AI Engine
- **Python 3.8+** - Core AI functionality
- **LangChain** - RAG framework
- **ChromaDB** - Vector database
- **HuggingFace Embeddings** - Text vectorization
- **Groq** - High-performance LLM API

## 📋 Prerequisites

- **Node.js 16+** installed
- **Python 3.8+** installed
- **Groq API Key** (get from [console.groq.com](https://console.groq.com/))
- **npm** or **yarn** package manager

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/DheerajGujarathi/KisaanSahayak.git
cd KisaanSahayak
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
```

### 3. Backend Setup (Node.js API Server)
```bash
cd web-app/backend
npm install
npm start
```
Server runs on `http://localhost:5001`

### 4. Frontend Setup (React App)
```bash
cd web-app/frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`

### 5. AI Engine Setup (Python)
```bash
# Install Python dependencies
pip install langchain chromadb sentence-transformers groq flask

# Run the knowledge base creation (one-time setup)
python day1_create_db.py

# Start the AI API server
python day3_api.py
```
AI API runs on `http://localhost:5000`

## 💡 Usage Examples

### 🌱 **Sample Questions You Can Ask:**
- "What's the best time to plant tomatoes?"
- "How do I control pests in my corn crop?"
- "What fertilizer should I use for wheat?"
- "Tell me about soil preparation techniques"
- "How to manage irrigation for rice farming?"

### 🚫 **Smart Filtering:**
The system intelligently handles:
- ✅ **Farming Questions**: Detailed, expert responses
- ✅ **Greetings**: Friendly acknowledgments
- ✅ **Follow-ups**: "Tell me more", "Elaborate"
- ❌ **Non-farming Topics**: Polite redirection to farming topics

## 🏗️ Project Structure

```
KisaanSahayak/
├── 📁 web-app/
│   ├── 📁 frontend/          # React application
│   │   ├── 📁 src/
│   │   │   ├── App.js        # Main app component
│   │   │   ├── components/   # UI components
│   │   │   └── styles/       # Styled components
│   │   └── package.json      # Frontend dependencies
│   └── 📁 backend/           # Node.js API server
│       ├── server.js         # Express server
│       └── package.json      # Backend dependencies
├── 📄 day1_create_db.py      # Vector database setup
├── 📄 day2_query.py          # Query testing script
├── 📄 day3_api.py            # Python AI API server
├── 📄 app.py                 # Standalone Python app
├── 📄 crop_guide.txt         # Farming knowledge base
├── 📁 Chroma_db/             # Vector database storage
└── 📄 .env                   # Environment variables
```

## 🎨 UI/UX Features

### 🎯 **Design Highlights**
- **Green Theme**: Agriculture-inspired color scheme
- **Clean Layout**: Minimalist, distraction-free interface
- **Responsive Design**: Adapts to all screen sizes
- **Smooth Animations**: Engaging user interactions
- **Accessibility**: Screen reader friendly

### 📱 **Mobile Optimized**
- Touch-friendly interface
- Optimized button sizes
- Swipe gestures for navigation
- Responsive typography

## 🔧 API Endpoints

### 🌐 **Node.js Backend API**
```
GET  /api/health              # Health check
POST /api/chat                # Send farming questions
GET  /api/chat-history        # Retrieve chat history
POST /api/save-chat           # Save chat session
```

### 🤖 **Python AI API**
```
POST /query                   # Process farming questions
GET  /health                  # AI service health check
```

## � Security Features

- **API Key Protection**: Secure environment variable handling
- **Input Validation**: Sanitized user inputs
- **CORS Configuration**: Controlled cross-origin requests
- **Error Handling**: Graceful error management

## � Performance Optimizations

- **Lazy Loading**: Components loaded on demand
- **Caching**: Optimized API response caching
- **Vector Search**: Efficient similarity search with ChromaDB
- **Bundle Optimization**: Minimized JavaScript bundles

## 🧪 Development & Testing

### 🛠️ **Development Mode**
```bash
# Backend with hot reload
npm run dev

# Frontend with live reload
npm start

# Python API with auto-reload
python day3_api.py
```

### 🧪 **Testing**
```bash
# Test AI filtering
python test_filtering.py

# Test API endpoints
curl -X POST http://localhost:5000/query \
  -H "Content-Type: application/json" \
  -d '{"query": "How to grow tomatoes?"}'
```

## 🚀 Deployment

### 🌍 **Production Deployment**
1. **Frontend**: Deploy to Netlify, Vercel, or AWS S3
2. **Backend**: Deploy to Heroku, Railway, or AWS EC2
3. **AI Engine**: Deploy to Railway, Google Cloud Run, or AWS Lambda

### 🔧 **Environment Variables**
```env
# Production
NODE_ENV=production
GROQ_API_KEY=your_production_api_key
FRONTEND_URL=https://your-frontend-domain.com
BACKEND_URL=https://your-backend-domain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Groq** - For providing high-performance LLM API
- **LangChain** - For the RAG framework
- **ChromaDB** - For vector storage and retrieval
- **React Community** - For the amazing frontend framework

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/DheerajGujarathi/KisaanSahayak/issues)
- **Discussions**: [GitHub Discussions](https://github.com/DheerajGujarathi/KisaanSahayak/discussions)

---

<div align="center">


🌾 **Happy Farming!** 🌱

</div>