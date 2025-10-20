#!/bin/bash

echo "======================================"
echo "  KisaanSahayak - Quick Deploy Script"
echo "======================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "Checking prerequisites..."

if ! command_exists git; then
    echo -e "${RED}✗ Git is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Git installed${NC}"

if ! command_exists node; then
    echo -e "${RED}✗ Node.js is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js installed${NC}"

if ! command_exists python3; then
    echo -e "${RED}✗ Python 3 is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python 3 installed${NC}"

echo ""
echo "Choose deployment platform:"
echo "1) Render.com (Recommended - Full Stack)"
echo "2) Vercel + Render (Frontend on Vercel, Backend/AI on Render)"
echo "3) Railway.app (All services)"
echo "4) Docker (Local/Self-hosted)"
echo "5) Manual deployment guide"
echo ""
read -p "Enter choice (1-5): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}Deploying to Render.com...${NC}"
        echo ""
        echo "Steps:"
        echo "1. Go to https://render.com"
        echo "2. Sign in with GitHub"
        echo "3. Click 'New' → 'Blueprint'"
        echo "4. Select this repository: KisaanSahayak"
        echo "5. Render will detect render.yaml automatically"
        echo "6. Add environment variable: GROQ_API_KEY"
        echo "7. Click 'Apply'"
        echo ""
        echo -e "${GREEN}Your app will be live in ~5 minutes!${NC}"
        ;;
    
    2)
        echo ""
        echo -e "${YELLOW}Deploying Frontend to Vercel...${NC}"
        
        if ! command_exists vercel; then
            echo "Installing Vercel CLI..."
            npm install -g vercel
        fi
        
        cd frontend
        echo "Building frontend..."
        npm install
        npm run build
        
        echo "Deploying to Vercel..."
        vercel --prod
        
        cd ..
        echo ""
        echo -e "${GREEN}Frontend deployed!${NC}"
        echo ""
        echo -e "${YELLOW}Now deploy Backend and AI Engine to Render.com:${NC}"
        echo "1. Go to https://render.com"
        echo "2. Create two Web Services"
        echo "3. Deploy backend/ and ai-engine/ folders"
        ;;
    
    3)
        echo ""
        echo -e "${YELLOW}Deploying to Railway.app...${NC}"
        echo ""
        echo "Steps:"
        echo "1. Go to https://railway.app"
        echo "2. Click 'Start a New Project'"
        echo "3. Select 'Deploy from GitHub repo'"
        echo "4. Choose KisaanSahayak repository"
        echo "5. Railway will auto-detect all services"
        echo "6. Add environment variables"
        echo "7. Click Deploy"
        ;;
    
    4)
        echo ""
        echo -e "${YELLOW}Deploying with Docker...${NC}"
        
        if ! command_exists docker; then
            echo -e "${RED}✗ Docker is not installed${NC}"
            echo "Install Docker from: https://docker.com"
            exit 1
        fi
        
        echo "Building Docker containers..."
        docker-compose up --build -d
        
        echo ""
        echo -e "${GREEN}✓ All services are running!${NC}"
        echo ""
        echo "Access your application:"
        echo "  Frontend:  http://localhost:3000"
        echo "  Backend:   http://localhost:3001"
        echo "  AI Engine: http://localhost:5000"
        echo ""
        echo "To view logs: docker-compose logs -f"
        echo "To stop: docker-compose down"
        ;;
    
    5)
        echo ""
        echo "Opening deployment guide..."
        if command_exists xdg-open; then
            xdg-open DEPLOYMENT_GUIDE.md
        elif command_exists open; then
            open DEPLOYMENT_GUIDE.md
        else
            echo "Please read DEPLOYMENT_GUIDE.md for detailed instructions"
        fi
        ;;
    
    *)
        echo -e "${RED}Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${GREEN}======================================"
echo "  Deployment process initiated!"
echo "======================================${NC}"
