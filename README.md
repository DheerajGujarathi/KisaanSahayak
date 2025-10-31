# KisaanSahayak - AI-Powered Agricultural Intelligence Platform

> **A full-stack RAG-based farming assistant delivering intelligent agricultural guidance through modern web technologies**

---

##  Demo Video

**[Watch Demo](https://drive.google.com/file/d/1pDERjberuUK_TSQV9N-F3FQs4s6LUlnX/view?usp=sharing)** 
---

## Overview

KisaanSahayak is an enterprise-grade farming assistance platform leveraging Retrieval Augmented Generation (RAG) technology to provide accurate, context-aware agricultural advice. Built with a modern microservices architecture, it features a React frontend, Node.js middleware, and a Python-based AI engine with vector database integration.

**Key Achievement**: Intelligent domain filtering ensures 100% farming-relevant responses, enhancing user experience and system reliability.

---

## Technical Architecture

### System Design
```
            
  React Frontend     Node.js API        Python AI Engine
  (Port 3000)        (Port 3001)        (Port 5000)     
            
                                                          
                                                          
   UI Components          RESTful API              RAG Pipeline + ChromaDB
```

### Project Structure
```
RAG-Farmers/
 ai-engine/              # Python Flask RAG service
    app.py             # Flask API with RAG implementation
    requirements.txt   # Python dependencies
    crop_guide.txt     # Agricultural knowledge base
    Chroma_db/         # Vector database storage
 backend/                # Node.js Express middleware
    server.js          # API routing & business logic
    package.json       # Node dependencies
 frontend/               # React web application
     src/
        components/    # Reusable UI components
        services/      # API integration layer
        styles/        # Styled-components theme
     package.json       # React dependencies
```

---

## Core Features & Technologies

### AI & Machine Learning
- **RAG Pipeline**: Custom-built Retrieval Augmented Generation system using LangChain
- **Vector Search**: ChromaDB for semantic similarity search
- **LLM Integration**: Groq API with Llama 3.1 for high-performance inference
- **Smart Filtering**: Context-aware domain classification (farming-only responses)
- **Embeddings**: HuggingFace Sentence Transformers (all-MiniLM-L6-v2)

### Frontend Development
- **Framework**: React 18+ with functional components and hooks
- **Styling**: Styled-components for modular, maintainable CSS-in-JS
- **State Management**: React Context API and custom hooks
- **HTTP Client**: Axios for efficient API communication
- **UX Features**: Real-time typing indicators, persistent chat history, responsive design

### Backend Development
- **Server**: Node.js with Express.js framework
- **Architecture**: RESTful API design with clean separation of concerns
- **Middleware**: CORS, body-parser, error handling
- **Data Flow**: Efficient request routing between frontend and AI engine

### DevOps & Tools
- **Version Control**: Git & GitHub
- **Package Management**: npm (Node.js), pip (Python)
- **Environment**: dotenv for configuration management
- **Logging**: Structured logging in AI engine

---

## Technical Skills Demonstrated

| Category | Technologies |
|----------|-------------|
| **Frontend** | React, JavaScript (ES6+), Styled-components, HTML5, CSS3 |
| **Backend** | Node.js, Express.js, RESTful API design |
| **AI/ML** | Python, LangChain, RAG, Vector Databases, NLP |
| **Databases** | ChromaDB (Vector DB) |
| **APIs** | Groq AI, HuggingFace |
| **Tools** | Git, npm, pip, VS Code |
| **Concepts** | Microservices, Full-Stack Development, API Integration |

---

## Installation & Setup

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Groq API Key ([Get Free Key](https://console.groq.com/))

### Quick Start (3 Simple Steps)

**Step 1: AI Engine Setup**
```bash
cd ai-engine
pip install -r requirements.txt
echo "GROQ_API_KEY=your_api_key_here" > .env
python app.py
```
*Runs on http://localhost:5000*

**Step 2: Backend Server**
```bash
cd backend
npm install
npm start
```
*Runs on http://localhost:3001*

**Step 3: Frontend Application**
```bash
cd frontend
npm install
npm start
```
*Runs on http://localhost:3000*

---

## Key Features

###  Intelligent Conversation System
- Context-aware responses using RAG technology
- Persistent chat history across sessions
- Real-time message processing with typing indicators
- Smart domain filtering (agriculture-only)

###  User Experience
- Clean, professional green-themed UI
- Responsive design for all devices
- Intuitive chat interface
- Session management and history export

###  Production-Ready Features
- Environment-based configuration
- Comprehensive error handling
- Input validation and sanitization
- API health monitoring endpoints
- Structured logging for debugging

---

## API Documentation

### Backend Endpoints (Node.js)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Send farming queries |
| GET | `/api/history/:userId` | Retrieve user chat history |
| POST | `/api/history` | Save chat session |
| GET | `/api/health` | Health check |

### AI Engine Endpoints (Python)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/query` | Process farming questions via RAG |
| GET | `/health` | AI service status |

**Sample Request**:
```json
POST /api/chat
{
  "query": "What is the best fertilizer for wheat crops?"
}
```

**Sample Response**:
```json
{
  "answer": "For wheat crops, NPK fertilizer with a ratio of 120:60:40...",
  "type": "farming_response"
}
```

---

## Development Highlights

### Problem Solving
- Designed intelligent topic classification to filter non-farming queries
- Implemented efficient vector search for fast knowledge retrieval
- Created seamless integration between three separate technology stacks
- Built persistent storage system for chat history

### Best Practices
- Component-based architecture for maintainability
- Environment variable management for security
- RESTful API design principles
- Clean code with proper error handling
- Comprehensive logging for production debugging

---

## Future Enhancements

- [ ] Multi-language support (Hindi, regional languages)
- [ ] Voice input/output capabilities
- [ ] Image recognition for crop disease detection
- [ ] Weather API integration
- [ ] User authentication and multi-user support
- [ ] Mobile application (React Native)
- [ ] Analytics dashboard for farming insights

---

## License

MIT License - See LICENSE file for details

---

## Contact & Links

- **GitHub**: [github.com/DheerajGujarathi](https://github.com/DheerajGujarathi)
- **Project Repository**: [KisaanSahayak](https://github.com/DheerajGujarathi/KisaanSahayak)
- **Issues**: [Report Issues](https://github.com/DheerajGujarathi/KisaanSahayak/issues)

---

**Built with**  **by Dheeraj Gujarathi** | Full-Stack Developer specializing in AI/ML Integration

*This project demonstrates proficiency in modern web development, AI integration, and full-stack architecture design.*
