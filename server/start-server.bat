@echo off
echo Starting Weather Dashboard Server...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
)

REM Check if nodemon is available
where nodemon >nul 2>nul
if %ERRORLEVEL% EQU 0 (
  echo Starting server with nodemon (development mode)...
  call nodemon server.js
) else (
  echo Starting server with node (production mode)...
  echo Install nodemon for live reload: npm install -g nodemon
  call node server.js
)
