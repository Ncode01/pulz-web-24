
```batch
@echo off
IF NOT EXIST "student-tracker-app" (
    git clone https://github.com/yourusername/student-tracker-app.git
)
cd student-tracker-app
npm install
set NODE_OPTIONS=--openssl-legacy-provider
npm start
pause