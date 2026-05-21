@echo off
REM Start BookPath mobile app (Expo web)
REM Checks and clears port 8081 before starting

echo.
echo ========================================
echo   BookPath Mobile App Launcher
echo ========================================
echo.

REM Check if port 8081 is in use
echo [1/3] Checking port 8081...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8081" ^| findstr "LISTENING"') do (
    echo   Port 8081 is in use by PID %%a
    echo   Killing process %%a...
    taskkill /F /PID %%a >nul 2>&1
    echo   Done. Waiting 2 seconds...
    timeout /t 2 /nobreak >nul
)

REM Clear Metro bundler cache
echo.
echo [2/3] Clearing Metro cache...
if exist "apps\mobile\node_modules\.cache" (
    rmdir /s /q "apps\mobile\node_modules\.cache" >nul 2>&1
    echo   Cache cleared.
) else (
    echo   No cache to clear.
)

REM Start Expo web server
echo.
echo [3/3] Starting Expo web server...
echo.
echo   Open http://localhost:8081 in your browser
echo   Press Ctrl+C to stop
echo.

npm --workspace apps/mobile run web
