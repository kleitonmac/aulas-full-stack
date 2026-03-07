// ARQUIVO: Parâmetros Dinâmicos em Rotas
// DESCRIÇÃO: Demonstra como usar parâmetros variáveis em rotas do Express
// CONCEITOS: rotas dinâmicas com :id, req.params, ordem de rotas

const express = require('express') // Framework Express
const app = express() // Aplicação Express
const port = 3000 // Porta

const path = require('path') // Módulo path

// Caminho base para templates
const basePath = path.join(__dirname, 'templates')

// MIDDLEWARE DE AUTENTICAÇÃO
var checkAuth = function (req, res, next) {
  req.authStatus = true

  if (req.authStatus) {
    console.log('Está logado, pode continuar')
    next()
  } else {
    console.log('Não está logado, faça o login para continuar!')
  }
}

// Aplica middleware globalmente
app.use(checkAuth)

// ROTA COM PARÂMETRO DINÂMICO
// :id é um parâmetro que pode receber qualquer valor
// Exemplo: /users/123 -> req.params.id será '123'
// IMPORTANTE: Rotas mais específicas devem estar ANTES de rotas genéricas!
// Esta rota antes do '/' porque '/users/:id' é mais específica
app.get('/users/:id', (req, res) => {
  // Acessa o parâmetro da rota através de req.params
  console.log(`Carregando usuário: ${req.params.id}`)

  res.sendFile(`${basePath}/users.html`)
})

// ROTA GENÉRICA (depois das específicas)
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
