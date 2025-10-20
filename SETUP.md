# Setup Guide - KisaanSahayak

This guide will help you set up the entire KisaanSahayak project from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.8 or higher** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16 or higher** - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (optional, for cloning)
- **Groq API Key** - [Get API Key](https://console.groq.com/)

## Quick Setup (Windows)

1. **Clone or download the repository**
   ```powershell
   git clone https://github.com/DheerajGujarathi/KisaanSahayak.git
   cd KisaanSahayak
   ```

2. **Set up AI Engine**
   ```powershell
   cd ai-engine
   
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Create .env file
   copy .env.example .env
   # Edit .env and add your GROQ_API_KEY
   
   cd ..
   ```

3. **Set up Backend**
   ```powershell
   cd backend
   
   # Install Node dependencies
   npm install
   
   # .env file will be created automatically by start-all.bat
   # Or manually: copy .env.example .env
   
   cd ..
   ```

4. **Set up Frontend**
   ```powershell
   cd frontend
   
   # Install React dependencies
   npm install
   
   # .env file will be created automatically by start-all.bat
   # Or manually: copy .env.example .env
   
   cd ..
   ```

5. **Start all services**
   ```powershell
   # Double-click start-all.bat or run:
   .\start-all.bat
   ```

## Quick Setup (Linux/Mac)

1. **Clone or download the repository**
   ```bash
   git clone https://github.com/DheerajGujarathi/KisaanSahayak.git
   cd KisaanSahayak
   ```

2. **Set up AI Engine**
   ```bash
   cd ai-engine
   
   # Install Python dependencies
   pip install -r requirements.txt
   
   # Create .env file
   cp .env.example .env
   # Edit .env and add your GROQ_API_KEY
   
   cd ..
   ```

3. **Set up Backend**
   ```bash
   cd backend
   
   # Install Node dependencies
   npm install
   
   # Create .env file
   cp .env.example .env
   
   cd ..
   ```

4. **Set up Frontend**
   ```bash
   cd frontend
   
   # Install React dependencies
   npm install
   
   # Create .env file
   cp .env.example .env
   
   cd ..
   ```

5. **Start all services**
   ```bash
   # Make the script executable
   chmod +x start-all.sh
   
   # Run the script
   ./start-all.sh
   ```

## Manual Setup (Step by Step)

### Step 1: AI Engine Setup

```bash
cd ai-engine
pip install -r requirements.txt
```

Create `.env` file with:
```
GROQ_API_KEY=your_actual_groq_api_key_here
```

Start the AI engine:
```bash
python app.py
```
✅ AI Engine should be running on http://localhost:5000

### Step 2: Backend Setup

```bash
cd backend
npm install
```

Create `.env` file with:
```
PORT=3001
PYTHON_API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

Start the backend:
```bash
npm start
```
✅ Backend should be running on http://localhost:3001

### Step 3: Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file with:
```
REACT_APP_API_URL=http://localhost:3001
```

Start the frontend:
```bash
npm start
```
✅ Frontend should automatically open at http://localhost:3000

## Troubleshooting

### Python Issues

**Problem:** `pip: command not found`
**Solution:** Make sure Python is installed and added to PATH

**Problem:** Module import errors
**Solution:** 
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### Node.js Issues

**Problem:** `npm: command not found`
**Solution:** Install Node.js from https://nodejs.org/

**Problem:** Port already in use
**Solution:** Change the port in the respective `.env` file

### API Connection Issues

**Problem:** Frontend can't connect to backend
**Solution:** 
1. Check if all three services are running
2. Verify `.env` files have correct URLs
3. Check firewall settings

**Problem:** "Invalid API Key" error
**Solution:** Verify your Groq API key in `ai-engine/.env`

### ChromaDB Issues

**Problem:** ChromaDB initialization errors
**Solution:** Delete the `Chroma_db` folder and restart the AI engine (it will recreate automatically)

## Verification Steps

After setup, verify everything is working:

1. **Check AI Engine:**
   ```bash
   curl http://localhost:5000/health
   ```
   Should return: `{"status": "healthy"}`

2. **Check Backend:**
   ```bash
   curl http://localhost:3001/api/health
   ```
   Should return health status JSON

3. **Check Frontend:**
   Open http://localhost:3000 in your browser
   You should see the KisaanSahayak chat interface

4. **Test Chat:**
   - Type a farming question like "What is the best time to plant tomatoes?"
   - You should get an AI-powered response

## Environment Variables Reference

### ai-engine/.env
```
GROQ_API_KEY=your_groq_api_key_here
```

### backend/.env
```
PORT=3001
PYTHON_API_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### frontend/.env
```
REACT_APP_API_URL=http://localhost:3001
```

## Next Steps

Once everything is running:

1. Try asking farming questions in the chat interface
2. Check chat history in the sidebar
3. Explore the codebase in each folder
4. Customize the knowledge base in `ai-engine/crop_guide.txt`
5. Modify the UI in `frontend/src/components/`

## Getting Help

- Check individual README.md files in each folder
- Review the main README.md for architecture details
- Open an issue on GitHub for bugs
- Check the logs in terminal windows for error messages

## Development Mode

For development with auto-reload:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
cd frontend
npm start
```
(React already has hot reload by default)

**AI Engine:**
Use Flask's debug mode by setting `debug=True` in `app.py`

## Production Deployment

For production deployment, refer to:
- AI Engine: Use Gunicorn or uWSGI
- Backend: Use PM2 or systemd
- Frontend: Build and serve with `npm run build`

See deployment documentation for detailed instructions.
