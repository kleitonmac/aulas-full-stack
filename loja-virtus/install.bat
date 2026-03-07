@echo off
REM Script para instalar e configurar Loja Virtus

echo.
echo ========================================
echo   Instalando Loja Virtus Joias
echo ========================================
echo.

REM Instalar Backend
echo [1/4] Instalando dependencias do Backend...
cd backend
call npm install
echo Backend instalado com sucesso!
echo.

REM Instalar Frontend
echo [2/4] Instalando dependencias do Frontend...
cd ..\frontend
call npm install
echo Frontend instalado com sucesso!
echo.

REM Voltar ao diretório raiz
cd ..

echo [3/4] Criando estrutura de pastas...
if not exist "data\db" mkdir "data\db"
echo Pasta de dados criada!
echo.

echo [4/4] Configuracao concluida!
echo.
echo ========================================
echo   Proximos Passos:
echo ========================================
echo.
echo 1. Inicie MongoDB em um terminal:
echo    mongod --dbpath "data/db"
echo.
echo 2. Em outro terminal, inicie o Backend:
echo    cd backend
echo    npm start
echo.
echo 3. Em um terceiro terminal, inicie o Frontend:
echo    cd frontend
echo    npm run dev
echo.
echo 4. Acesse http://localhost:3000 no seu navegador
echo.
echo ========================================
echo.
pause
