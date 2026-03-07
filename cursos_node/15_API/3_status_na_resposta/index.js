/**
 * API REST - USANDO STATUS HTTP
 * =============================
 * Demonstra como validar dados recebidos e retornar status HTTP apropriado
 * Status codes indicam o resultado da requisição:
 * - 200: OK (sucesso)
 * - 422: Unprocessable Entity (dados inválidos)
 * - 500: Internal Server Error (erro do servidor)
 */

// Acessar em http://localhost:3000/createproduct (POST)
const express = require('express')
const app = express()

// Middleware para processar dados de formulário
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware para processar JSON
app.use(express.json())

// Rota POST com validação
app.post('/createproduct', (req, res) => {
  const name = req.body.name
  const price = req.body.price

  // Valida se o nome foi enviado
  if (!name) {
    // Retorna status 422 (dados inválidos) com mensagem de erro
    res.status(422).json({ message: `O campo nome precisa ser enviado!` })
    return
  }

  console.log(name)
  console.log(price)

  res
    .status(201)
    .json({ message: `O produto: ${name} foi criado com sucesso!` })
})

app.get('/', (req, res) => {
  res.json({ message: 'Primeira rota criada com sucesso!' })
})

app.listen(3000)
