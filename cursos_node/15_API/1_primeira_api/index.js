/**
 * API REST - PRIMEIRA ROTA
 * =======================
 * Demonstra como criar a primeira rota de uma API REST
 * Uma API retorna dados em JSON em vez de renderizar HTML
 * Este exemplo cria um endpoint GET simples que retorna um objeto JSON
 */

// Pode ser acessado via browser em http://localhost:3000/
const express = require('express')
const app = express()

// Middleware para processar dados de formulário (POST)
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware para processar dados JSON
app.use(express.json())

// Rota GET: retorna um objeto JSON como resposta
app.get('/', (req, res) => {
  // res.json() envia uma resposta em formato JSON
  res.json({ message: 'Primeira rota criada com sucesso!' })
})

// Inicia o servidor na porta 3000
app.listen(3000)
console.log('\x1b[32m✓ API rodando em http://localhost:3000\x1b[0m')
