#!/bin/bash

echo "======================================="
echo "  KisaanSahayak - Starting All Services"
echo "======================================="
echo ""

echo "Checking environment files..."
if [ ! -f "ai-engine/.env" ]; then
    echo "WARNING: ai-engine/.env not found!"
    echo "Please create it from ai-engine/.env.example"
    exit 1
fi

if [ ! -f "backend/.env" ]; then
    echo "WARNING: backend/.env not found!"
    echo "Creating from template..."
    cp backend/.env.example backend/.env
fi

if [ ! -f "frontend/.env" ]; then
    echo "WARNING: frontend/.env not found!"
    echo "Creating from template..."
    cp frontend/.env.example frontend/.env
fi

echo ""
echo "Starting AI Engine (Python Flask)..."
cd ai-engine && python app.py &
AI_PID=$!
cd ..
sleep 3

echo ""
echo "Starting Backend (Node.js Express)..."
cd backend && npm start &
BACKEND_PID=$!
cd ..
sleep 3

echo ""
echo "Starting Frontend (React)..."
cd frontend && npm start &
FRONTEND_PID=$!
cd ..

echo ""
echo "======================================="
echo "  All services started!"
echo "======================================="
echo "  - AI Engine:  http://localhost:5000"
echo "  - Backend:    http://localhost:3001"
echo "  - Frontend:   http://localhost:3000"
echo "======================================="
echo ""
echo "Press Ctrl+C to stop all services..."

# Wait for Ctrl+C
trap "kill $AI_PID $BACKEND_PID $FRONTEND_PID; exit" INT
wait
