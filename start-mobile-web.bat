@echo off
REM Start BookPath mobile app in web browser
REM Quick version — no port check, just starts
echo.
echo Starting BookPath mobile app (Expo web)...
echo Open http://localhost:8081 in your browser when ready.
echo.
npm --workspace apps/mobile run web
