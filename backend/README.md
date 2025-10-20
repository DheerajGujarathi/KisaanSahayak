# Backend - RAG-Farmers

This folder contains the Node.js/Express backend server that acts as a middleware between the frontend and the AI engine.

## Contents

- **server.js**: Express server with API endpoints
- **package.json**: Node.js dependencies and scripts

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with:
```
PORT=3001
PYTHON_API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

3. Run the backend:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The backend will start on `http://localhost:3001` by default.

## API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/chat` - Send chat messages to the AI engine
- `GET /api/history/:userId` - Get chat history for a user
- `POST /api/history` - Save chat history

## Features

- Rate limiting for API protection
- CORS support
- Request compression
- Security headers with Helmet
- Request logging with Morgan
