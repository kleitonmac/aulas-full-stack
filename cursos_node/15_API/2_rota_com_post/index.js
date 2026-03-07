/**
 * API REST - ROTA COM MÙTODO POST
 * ===============================
 * Demonstra como criar uma rota POST que recebe dados
 * A rota processa informações no corpo (body) da requisição
 * Retorna uma resposta em JSON com os dados recebidos
 */

// Acessar em http://localhost:3000/createproduct (POST)
const express = require('express')
const app = express()

// Middleware para processar dados de formulário (POST)
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware para processar JSON
app.use(express.json())

// Rota POST: recebe dados e retorna resposta em JSON
app.post('/createproduct', (req, res) => {
  // Extrai os dados enviados na requisição POST
  const name = req.body.name
  const price = req.body.price

  // Log para debug (mostra os dados no console)
  console.log(name)
  console.log(price)

  // Retorna uma resposta JSON com uma mensagem de sucesso
  res.json({ message: `O produto: ${name} foi criado com sucesso!` })
})

app.get('/', (req, res) => {
  res.json({ message: 'Primeira rota criada com sucesso!' })
})

app.listen(3000)
