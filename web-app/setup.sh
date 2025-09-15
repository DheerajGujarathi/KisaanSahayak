#!/bin/bash

# RAG Farmers Full Stack Setup Script
echo "🌾 Setting up RAG Farmers Full Stack Application..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

# Check if Python is installed
if ! command -v python &> /dev/null; then
    echo "❌ Python is not installed. Please install Python 3.8+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Setup Python environment
echo "📦 Setting up Python environment..."
if [ ! -f "requirements.txt" ]; then
    echo "❌ requirements.txt not found. Please run this script from the RAG-Farmers directory."
    exit 1
fi

pip install -r requirements.txt

if [ ! -f ".env" ]; then
    echo "⚙️  Creating Python .env file..."
    echo "GROQ_API_KEY=your_groq_api_key_here" > .env
    echo "⚠️  Please add your GROQ_API_KEY to the .env file"
fi

# Setup Backend
echo "🚀 Setting up Node.js backend..."
cd web-app/backend
npm install

if [ ! -f ".env" ]; then
    echo "⚙️  Creating backend .env file..."
    cp .env.example .env
fi

# Setup Frontend
echo "⚛️  Setting up React frontend..."
cd ../frontend
npm install

echo "✅ Setup complete!"
echo ""
echo "🎯 Next steps:"
echo "1. Add your GROQ_API_KEY to .env file"
echo "2. Run the start script: ./start-dev.sh"
echo ""
echo "📚 Read web-app/README.md for detailed instructions"