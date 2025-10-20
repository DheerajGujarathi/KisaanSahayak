@echo off
echo =======================================
echo   KisaanSahayak - Starting All Services
echo =======================================
echo.

echo Checking environment files...
if not exist "ai-engine\.env" (
    echo WARNING: ai-engine\.env not found!
    echo Please create it from ai-engine\.env.example
    pause
    exit /b 1
)

if not exist "backend\.env" (
    echo WARNING: backend\.env not found!
    echo Creating from template...
    copy backend\.env.example backend\.env
)

if not exist "frontend\.env" (
    echo WARNING: frontend\.env not found!
    echo Creating from template...
    copy frontend\.env.example frontend\.env
)

echo.
echo Starting AI Engine (Python Flask)...
start "AI Engine" cmd /k "cd ai-engine && python app.py"
timeout /t 3

echo.
echo Starting Backend (Node.js Express)...
start "Backend" cmd /k "cd backend && npm start"
timeout /t 3

echo.
echo Starting Frontend (React)...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo =======================================
echo   All services started!
echo =======================================
echo   - AI Engine:  http://localhost:5000
echo   - Backend:    http://localhost:3001
echo   - Frontend:   http://localhost:3000
echo =======================================
echo.
echo Press any key to close this window...
pause >nul
