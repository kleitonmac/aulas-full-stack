#!/bin/bash

echo "🧪 Testando Loja Virtus..."
echo ""

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Teste 1: Node.js instalado
echo -n "✓ Verificando Node.js... "
if command -v node &> /dev/null; then
    echo -e "${GREEN}OK${NC} ($(node -v))"
else
    echo -e "${RED}FALHOU${NC}"
    exit 1
fi

# Teste 2: npm instalado
echo -n "✓ Verificando npm... "
if command -v npm &> /dev/null; then
    echo -e "${GREEN}OK${NC} ($(npm -v))"
else
    echo -e "${RED}FALHOU${NC}"
    exit 1
fi

# Teste 3: MongoDB instalado
echo -n "✓ Verificando MongoDB... "
if command -v mongod &> /dev/null; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}AVISO${NC} (Instalar de https://www.mongodb.com/try/download/community)"
fi

# Teste 4: Pastas do projeto
echo -n "✓ Verificando estrutura... "
if [ -d "backend" ] && [ -d "frontend" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FALHOU${NC} - Pastas backend/frontend não encontradas"
    exit 1
fi

# Teste 5: Dependencies Backend
echo -n "✓ Verificando dependências Backend... "
if [ -d "backend/node_modules" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}AVISO${NC} - Execute: cd backend && npm install"
fi

# Teste 6: Dependencies Frontend
echo -n "✓ Verificando dependências Frontend... "
if [ -d "frontend/node_modules" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}AVISO${NC} - Execute: cd frontend && npm install"
fi

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  Ambiente configurado com sucesso! ✅${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo "Próximos passos:"
echo "1. mongod --dbpath 'data/db'"
echo "2. cd backend && npm start"
echo "3. cd frontend && npm run dev"
echo "4. Acesse http://localhost:3000"
echo ""
