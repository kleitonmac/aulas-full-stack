@echo off
echo.
echo ========================================
echo   Iniciando Loja Virtus Joias
echo ========================================
echo.

REM Iniciar MongoDB
echo [1/3] Iniciando MongoDB...
start cmd /k mongod --dbpath "data/db"
echo MongoDB iniciado em localhost:27017
echo Aguarde 3 segundos...
timeout /t 3 > nul

REM Iniciar Backend
echo [2/3] Iniciando Backend...
start cmd /k "cd backend && npm start"
echo Backend iniciado em localhost:5000
echo Aguarde 3 segundos...
timeout /t 3 > nul

REM Iniciar Frontend
echo [3/3] Iniciando Frontend...
start cmd /k "cd frontend && npm run dev"
echo Frontend iniciado em localhost:3000
echo.

echo ========================================
echo   Loja Virtus esta pronta!
echo ========================================
echo.
echo Acesse: http://localhost:3000
echo.
echo Pressione qualquer tecla para fechar...
pause > nul
