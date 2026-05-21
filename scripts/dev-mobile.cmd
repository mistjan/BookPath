@echo off
REM BookPath mobile dev server ? ???????????? spawn EPERM?
cd /d %~dp0..\apps\mobile
set BROWSER=none
npx expo start --web --port 8081
