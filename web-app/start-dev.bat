@echo off
title KisaanSahayak Development Environment

echo 🌾 Starting KisaanSahayak Development Environment...

REM Function to check if port is in use (simplified for Windows)
echo 🔍 Checking if services are available...

REM Start Python RAG API
echo 🐍 Starting Python RAG API (port 5000)...
start "Python RAG API" cmd /k "python app.py"

REM Wait a moment for Python API to start
timeout /t 3 /nobreak > nul

REM Start Node.js backend
echo 🚀 Starting Node.js backend (port 3001)...
cd web-app\backend
start "Node.js Backend" cmd /k "npm run dev"
cd ..\..

REM Wait a moment for backend to start
timeout /t 2 /nobreak > nul

REM Start React frontend
echo ⚛️ Starting React frontend (port 3000)...
cd web-app\frontend
start "React Frontend" cmd /k "npm start"
cd ..\..

echo.
echo 🎉 All services are starting!
echo 📱 Frontend: http://localhost:3000
echo 🔌 Backend API: http://localhost:3001
echo 🤖 Python API: http://localhost:5000
echo.
echo 💡 Each service is running in its own window
echo 💡 Close individual windows to stop services
echo 💡 Check each window for any startup errors
echo.
pause