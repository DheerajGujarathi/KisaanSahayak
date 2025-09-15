#!/bin/bash

# Start all development servers for RAG Farmers
echo "🌾 Starting RAG Farmers Development Environment..."

# Function to check if port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use"
        return 1
    fi
    return 0
}

# Check required ports
echo "🔍 Checking ports..."
check_port 3000 || exit 1
check_port 3001 || exit 1  
check_port 5000 || exit 1

echo "✅ All ports available"

# Start Python RAG API in background
echo "🐍 Starting Python RAG API (port 5000)..."
python app.py &
PYTHON_PID=$!
echo "Python API PID: $PYTHON_PID"

# Wait a moment for Python API to start
sleep 3

# Start Node.js backend in background
echo "🚀 Starting Node.js backend (port 3001)..."
cd web-app/backend
npm run dev &
BACKEND_PID=$!
echo "Backend PID: $BACKEND_PID"
cd ../..

# Wait a moment for backend to start
sleep 2

# Start React frontend
echo "⚛️  Starting React frontend (port 3000)..."
cd web-app/frontend
npm start &
FRONTEND_PID=$!
echo "Frontend PID: $FRONTEND_PID"

echo ""
echo "🎉 All services started!"
echo "📱 Frontend: http://localhost:3000"
echo "🔌 Backend API: http://localhost:3001"
echo "🤖 Python API: http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping all services..."
    kill $PYTHON_PID $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ All services stopped"
}

# Set trap to cleanup on script exit
trap cleanup INT TERM

# Wait for any process to finish
wait