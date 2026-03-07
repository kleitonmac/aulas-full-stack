// ARQUIVO: Middleware de Autenticação
// DESCRIÇÃO: Demonstra como criar e usar middleware no Express
// CONCEITOS: middleware, funções de autenticação, next(), verificações de acesso

const express = require('express') // Framework Express
const app = express() // Aplicação Express
const port = 3000 // Porta do servidor

const path = require('path') // Módulo path

// Caminho absoluto para pasta templates
const basePath = path.join(__dirname, 'templates')

// MIDDLEWARE: Função que executa antes de cada rota
// Middleware recebe req (requisição), res (resposta) e next (função para continuar)
var checkAuth = function (req, res, next) {
  // Define uma propriedade no objeto req para armazenar status de autenticação
  req.authStatus = true

  // Verifica se o usuário está autenticado
  if (req.authStatus) {
    console.log('Está logado, pode continuar')
    next() // Chama next() para passar para a próxima função/rota
  } else {
    console.log('Não está logado, faça o login para continuar!')
    // Se não estiver autenticado, não chama next(), então a requisição para aqui
  }
}

// Registra o middleware para TODAS as rotas
// Este middleware executará antes de qualquer rota ser processada
app.use(checkAuth)

// Agora todas as rotas ficam protegidas pelo middleware
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

// Servidor escutando
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
