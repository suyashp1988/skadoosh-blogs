@echo off
REM Quick setup script for Word to Blog converter
REM Run this once to install dependencies

echo Installing Python dependencies for Word to Blog converter...
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python 3.7+ from https://python.org
    pause
    exit /b 1
)

echo Python found. Installing packages...
echo.

REM Install required packages
pip install -r tools/requirements.txt

if errorlevel 1 (
    echo.
    echo Error installing packages. Please check your internet connection.
    pause
    exit /b 1
)

echo.
echo ✅ Setup complete! 
echo.
echo Usage examples:
echo   python tools/word-to-blog.py "my-document.docx"
echo   python tools/word-to-blog.py "article.docx" --slug "my-blog-post"
echo.
echo See tools/README.md for full documentation.
pause