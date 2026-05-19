@echo off
chcp 65001 >nul
title BookPath - 清理 Next 缓存并重启服务器

echo.
echo ================================
echo  BookPath 清理缓存并重启服务器
echo ================================
echo.

cd /d "C:\Users\56265\Documents\BookPath"

if errorlevel 1 (
    echo.
    echo [错误] 无法进入项目目录。
    echo 请检查路径是否存在：C:\Users\56265\Documents\BookPath
    echo.
    pause
    exit /b 1
)

echo 当前目录：
cd
echo.

echo 正在检查 3000 端口是否被占用...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000" ^| findstr "LISTENING"') do (
    echo 发现 3000 端口占用进程 PID：%%a
    echo 正在关闭该进程...
    taskkill /PID %%a /F >nul 2>nul
)

echo.
echo 正在清理 .next 缓存...
if exist ".next" (
    rmdir /s /q ".next"
    echo .next 已删除。
) else (
    echo 未发现 .next 文件夹，跳过。
)

echo.
echo 正在启动开发服务器...
echo.

npm run dev

echo.
echo 服务器已停止或启动失败。
pause
