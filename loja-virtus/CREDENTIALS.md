# 🔐 Credenciais Padrão para Testes

Após executar `npm run seed` no backend, use essas credenciais:

## 👨‍💼 Admin

- **Email**: admin@lojavirtus.com
- **Senha**: admin123
- **Acesso**: Painel Admin em `/admin`

## 👤 Usuário Teste

- **Email**: user@example.com
- **Senha**: user123
- **Acesso**: Usuário comum

## 🚀 Como Usar

1. **Inicie MongoDB**:

   ```bash
   mongod --dbpath "data/db"
   ```

2. **Inicie o Backend**:

   ```bash
   cd backend
   npm install  # primeira vez
   npm run seed  # popular banco com dados de teste
   npm start
   ```

3. **Inicie o Frontend**:

   ```bash
   cd frontend
   npm install  # primeira vez
   npm run dev
   ```

4. **Acesse**: http://localhost:3000

5. **Faça login** com uma das credenciais acima

## 📝 Criando Novo Usuário

Você também pode criar um novo usuário clicando em "Criar Conta" na página de login.

## ⚙️ Troubleshooting

### Erro: "Cannot GET /api/cart"

- Certifique-se que o backend está rodando em http://localhost:5000
- Verifique o .env do backend tem `MONGO_URI=mongodb://localhost:27017/loja-virtus`

### Erro: "Connection refused"

- MongoDB não está rodando
- Execute `mongod --dbpath "data/db"` em um terminal

### Dados não aparecem após login

- Rode `npm run seed` para popular o banco
- Verifique que o MongoDB está rodando
- Limpe o localStorage do navegador (F12 > Console > `localStorage.clear()`)
