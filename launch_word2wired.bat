@echo off
SETLOCAL EnableDelayedExpansion

:: Word2Wired Launcher - PUSL3190 Project
:: Created for automated testing on Windows

TITLE Word2Wired Project Launcher

echo.
echo  ==============================================================
echo      Word2Wired: Semantic UI/UX Prototype Launcher
echo  ==============================================================
echo.

:: Check for Node.js
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Node.js is not installed or not in your PATH. 
    echo Please install Node.js from https://nodejs.org/
    pause
    exit /b
)

:: Navigate to the prototype directory (renaming blocked by system)
cd /d "%~dp0prototype"

if not exist "package.json" (
    echo [ERROR] Could not find the prototype directory.
    echo Please ensure this batch file is placed in d:\Projects\Ushira\build\
    pause
    exit /b
)

echo [STEP 1/2] Checking dependencies...
if not exist "node_modules\" (
    echo node_modules not found. Running full installation...
    call npm install
) else (
    echo node_modules found. Skipping full install.
    echo To force an update, delete the 'node_modules' folder and run this again.
)

echo.
echo [STEP 2/2] Starting Development Server...
echo.
echo  --------------------------------------------------------------
echo   The app will be available at: http://localhost:5173
echo   Press Ctrl+C and then 'Y' to stop the server when finished.
echo  --------------------------------------------------------------
echo.

call npm run dev

echo.
echo Server has stopped.
pause
