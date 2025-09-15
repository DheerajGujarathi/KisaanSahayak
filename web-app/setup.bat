@echo off
echo 🌾 Setting up KisaanSahayak Full Stack Application...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    pause
    exit /b 1
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Setup Python environment
echo 📦 Setting up Python environment...
if not exist "..\requirements.txt" (
    echo ❌ requirements.txt not found. Please run this script from the web-app directory inside KisaanSahayak.
    pause
    exit /b 1
)

cd ..
pip install -r requirements.txt

if not exist ".env" (
    echo ⚙️ Creating Python .env file...
    echo GROQ_API_KEY=your_groq_api_key_here > .env
    echo ⚠️ Please add your GROQ_API_KEY to the .env file
)

cd web-app

REM Setup Backend
echo 🚀 Setting up Node.js backend...
cd backend
call npm install

if not exist ".env" (
    echo ⚙️ Creating backend .env file...
    copy .env.example .env
)

REM Setup Frontend
echo ⚛️ Setting up React frontend...
cd ..\frontend
call npm install

cd ..\..

echo ✅ Setup complete!
echo.
echo 🎯 Next steps:
echo 1. Add your GROQ_API_KEY to .env file
echo 2. Run the start script: start-dev.bat
echo.
echo 📚 Read web-app\README.md for detailed instructions
pause