@echo off

REM Install concurrently globally if not already installed
@REM npm list -g concurrently > nul 2>&1
if %errorlevel% neq 0 (
    npm install -g concurrently
)

cd .\
if %errorlevel% neq 0 exit /b %errorlevel%
npx concurrently "cd backend && npm install && npm run start" "cd frontend\client && npm install && npm start"