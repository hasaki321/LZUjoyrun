@echo off
REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Node.js is not installed. Installing Node.js...
    REM Add your Node.js installation command here
    REM For example, you might use Chocolatey or another package manager
    REM Or direct download and install from Node.js website
    REM For demonstration, let's assume using Chocolatey
    choco install nodejs -y
)

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Python is not installed. Installing Python...
    REM Add your Python installation command here
    REM For example, you might use Chocolatey or another package manager
    REM Or direct download and install from Python website
    REM For demonstration, let's assume using Chocolatey
    choco install python -y
    REM Install dependencies
    pip install -r requirements.txt
)

REM Start the script
echo Starting the script...
cd ./web

REM Open the browser to the specified page
timeout /t 2 >nul
start "" "http://localhost:4000/joyrun"
echo Please open http://localhost:4000/joyrun in your browser

echo Script started. Check logfile.txt for logs.
node server.js >../logfile.txt 2>&1
