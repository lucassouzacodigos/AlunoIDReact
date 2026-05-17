@echo off

start "Frontend" cmd /k "cd /d %~dp0 && npm run dev"
start "Backend" cmd /k "cd /d %~dp0server && nodemon index.js"
start "Mobile" cmd /k "cd /d %~dp0..\AlunoID-Mobile && npm start"
