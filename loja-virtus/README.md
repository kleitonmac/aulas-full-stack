# 📋 README - Loja Virtus de Joias Online

Bem-vindo à **Loja Virtus** - Uma aplicação completa de e-commerce para joias com:

- ✅ Frontend moderno com Next.js e React
- ✅ Backend robusto com Node.js e Express
- ✅ Banco de dados MongoDB
- ✅ Sistema de autenticação JWT
- ✅ Carrinho de compras persistente
- ✅ Painel administrativo
- ✅ Integração com Stripe (preparada)

## 🎯 Start Rápido (3 Passos)

### 1. Configure MongoDB Local

```bash
# Windows - em um terminal
mongod --dbpath "data/db"

# macOS/Linux
mongod
```

### 2. Inicie o Backend

```bash
cd backend
npm install
npm run seed  # Popular banco com dados de teste
npm start     # http://localhost:5000
```

### 3. Inicie o Frontend

```bash
cd frontend
npm install
npm run dev   # http://localhost:3000
```

## 📝 Credenciais de Teste

Após rodar `npm run seed`:

| Tipo    | Email                | Senha    |
| ------- | -------------------- | -------- |
| Admin   | admin@lojavirtus.com | admin123 |
| Usuário | user@example.com     | user123  |

## 🗂️ Estrutura do Projeto

```
loja-virtus/
├── backend/
│   ├── src/
│   │   ├── models/         # MongoDB schemas (User, Cart, Order)
│   │   ├── routes/         # APIs (auth, cart, orders, admin)
│   │   └── middleware/     # Autenticação JWT
│   ├── .env               # Configurações do backend
│   ├── server.js          # Servidor Express
│   └── seed.js            # Dados de teste
├── frontend/
│   ├── app/
│   │   ├── page.tsx       # Página inicial
│   │   ├── login/         # Login/Registro
│   │   ├── aneis/         # Categoria Anéis
│   │   ├── colares/       # Categoria Colares
│   │   ├── brincos/       # Categoria Brincos
│   │   ├── relogios/      # Categoria Relógios
│   │   ├── carrinho/      # Página do carrinho
│   │   ├── checkout/      # Finalização de compra
│   │   ├── pedidos/       # Histórico de pedidos
│   │   ├── admin/         # Painel administrativo
│   │   └── context/       # React contexts (Auth, Cart)
│   ├── components/        # Componentes reutilizáveis
│   ├── services/          # Chamadas de API
│   └── .env.local         # Configurações do frontend
├── SETUP.md              # Guia detalhado de instalação
├── CREDENTIALS.md        # Credenciais padrão
├── install.bat           # Script de instalação (Windows)
└── start.bat             # Script para iniciar (Windows)
```

## 🎨 Funcionalidades

### 👥 Autenticação

- Registro de novos usuários
- Login com JWT
- Logout
- Persistência de sessão
- Dois níveis de permissão (Admin e Usuário)

### 🛒 Ecommerce

- Catálogo com 13 produtos
- 4 categorias (Anéis, Colares, Brincos, Relógios)
- Carrinho com persistência no banco
- Sistema de pedidos
- Acompanhamento de status

### 👨‍💼 Admin

- Dashboard com estatísticas
- Gerenciamento de pedidos
- Lista de usuários
- Atualização de status de pedidos

## 🔌 APIs Disponíveis

### Autenticação

```
POST /api/auth/register
POST /api/auth/login
```

### Carrinho

```
GET    /api/cart
POST   /api/cart/add
PUT    /api/cart/update/:productId
DELETE /api/cart/remove/:productId
DELETE /api/cart/clear
```

### Pedidos

```
POST   /api/orders/create
GET    /api/orders/my-orders
GET    /api/orders (admin)
PUT    /api/orders/:id/status (admin)
```

### Admin

```
GET /api/admin/stats
GET /api/admin/users
```

## 🛠️ Stack Tecnológico

### Frontend

- **Next.js 16** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP cliente
- **React Icons** - Ícones
- **Stripe.js** - Pagamentos

### Backend

- **Node.js** - Server runtime
- **Express** - Web framework
- **MongoDB/Mongoose** - Banco de dados
- **JWT** - Autenticação
- **Bcryptjs** - Hash de senhas
- **Nodemailer** - Envio de emails
- **Stripe** - Pagamentos

## ⚙️ Variáveis de Ambiente

### Backend (.env)

```
MONGO_URI=mongodb://localhost:27017/loja-virtus
JWT_SECRET=loja-virtus-secret-key-2026
STRIPE_SECRET_KEY=sk_test_...
EMAIL_USER=seu-email@gmail.com
EMAIL_PASS=sua-senha
PORT=5000
```

### Frontend (.env.local)

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 🚩 Troubleshooting

### Erro de Conexão MongoDB

```
✋ Solução: Certifique-se que mongod está rodando
mongod --dbpath "data/db"
```

### CORS Error

```
✋ Solução: Backend deve estar em http://localhost:5000
```

### Produtos não carregam

```
✋ Solução: Limpe cache/localStorage
localStorage.clear()
```

### Sem dados de teste

```
✋ Solução: Execute npm run seed no backend
cd backend && npm run seed
```

## 📱 Fluxo do Usuário

1. **Acesso** → http://localhost:3000
2. **Registro/Login** → Criar conta ou fazer login
3. **Navegação** → Explorar categorias
4. **Compra** → Adicionar ao carrinho
5. **Checkout** → Preencher endereço
6. **Confirmação** → Pedido salvo no banco
7. **Histórico** → Meus Pedidos
8. **Admin** → /admin (para administradores)

## 🔐 Segurança

- ✅ Senhas hash com bcryptjs (10 rounds)
- ✅ JWT tokens com expiração de 7 dias
- ✅ Autenticação em todas as rotas protegidas
- ✅ CORS configurado
- ✅ Validação de entrada

## 🚀 Próximos Passos

1. **Configurar Stripe** com chaves reais para pagamentos
2. **Configurar Email** com credenciais reais do Gmail
3. **Adicionar Mais Produtos** via painel admin
4. **Configurar HTTPS** para produção
5. **Deploy** em Vercel (frontend) e Railway/Heroku (backend)

## 📞 Suporte

Se encontrar problemas:

1. Verifique se MongoDB está rodando
2. Verifique se Backend está em localhost:5000
3. Limpe cache do navegador (Ctrl+Shift+Del)
4. Verifique o console do navegador (F12)
5. Verifique logs do terminal

---

**Desenvolvedido com ❤️ para sua loja de joias online**

Versão: 1.0.0 | Data: Março 2026
