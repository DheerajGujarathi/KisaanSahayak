@echo off
setlocal enabledelayedexpansion

echo ======================================
echo   KisaanSahayak - Quick Deploy Script
echo ======================================
echo.

REM Check prerequisites
echo Checking prerequisites...

where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Git is not installed
    exit /b 1
)
echo [OK] Git installed

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Node.js is not installed
    exit /b 1
)
echo [OK] Node.js installed

where python >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Python is not installed
    exit /b 1
)
echo [OK] Python installed

echo.
echo Choose deployment platform:
echo 1) Render.com (Recommended - Full Stack)
echo 2) Vercel + Render (Frontend on Vercel, Backend/AI on Render)
echo 3) Railway.app (All services)
echo 4) Docker (Local/Self-hosted)
echo 5) Manual deployment guide
echo.
set /p choice="Enter choice (1-5): "

if "%choice%"=="1" (
    echo.
    echo Deploying to Render.com...
    echo.
    echo Steps:
    echo 1. Go to https://render.com
    echo 2. Sign in with GitHub
    echo 3. Click 'New' -^> 'Blueprint'
    echo 4. Select this repository: KisaanSahayak
    echo 5. Render will detect render.yaml automatically
    echo 6. Add environment variable: GROQ_API_KEY
    echo 7. Click 'Apply'
    echo.
    echo Your app will be live in ~5 minutes!
) else if "%choice%"=="2" (
    echo.
    echo Deploying Frontend to Vercel...
    
    where vercel >nul 2>nul
    if %errorlevel% neq 0 (
        echo Installing Vercel CLI...
        call npm install -g vercel
    )
    
    cd frontend
    echo Building frontend...
    call npm install
    call npm run build
    
    echo Deploying to Vercel...
    call vercel --prod
    
    cd ..
    echo.
    echo Frontend deployed!
    echo.
    echo Now deploy Backend and AI Engine to Render.com:
    echo 1. Go to https://render.com
    echo 2. Create two Web Services
    echo 3. Deploy backend/ and ai-engine/ folders
) else if "%choice%"=="3" (
    echo.
    echo Deploying to Railway.app...
    echo.
    echo Steps:
    echo 1. Go to https://railway.app
    echo 2. Click 'Start a New Project'
    echo 3. Select 'Deploy from GitHub repo'
    echo 4. Choose KisaanSahayak repository
    echo 5. Railway will auto-detect all services
    echo 6. Add environment variables
    echo 7. Click Deploy
) else if "%choice%"=="4" (
    echo.
    echo Deploying with Docker...
    
    where docker >nul 2>nul
    if %errorlevel% neq 0 (
        echo [X] Docker is not installed
        echo Install Docker from: https://docker.com
        exit /b 1
    )
    
    echo Building Docker containers...
    docker-compose up --build -d
    
    echo.
    echo [OK] All services are running!
    echo.
    echo Access your application:
    echo   Frontend:  http://localhost:3000
    echo   Backend:   http://localhost:3001
    echo   AI Engine: http://localhost:5000
    echo.
    echo To view logs: docker-compose logs -f
    echo To stop: docker-compose down
) else if "%choice%"=="5" (
    echo.
    echo Opening deployment guide...
    start DEPLOYMENT_GUIDE.md
) else (
    echo Invalid choice
    exit /b 1
)

echo.
echo ======================================
echo   Deployment process initiated!
echo ======================================

pause
