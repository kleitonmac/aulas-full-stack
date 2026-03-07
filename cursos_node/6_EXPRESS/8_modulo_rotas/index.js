// ARQUIVO: Principal - Usando Módulo de Rotas Externo
// DESCRIÇÃO: Demonstra como organizar rotas em um arquivo separado (modularização)
// CONCEITOS: require, middleware, app.use para integrar módulos de rota

const express = require('express') // Framework Express
const app = express() // Instância da aplicação
const port = 3000 // Porta do servidor

const path = require('path') // Módulo path

// Caminho base
const basePath = path.join(__dirname, 'templates')

// IMPORTA o módulo de rotas de usuário de um arquivo separado
// Este arquivo (./users) exporta um router do Express com suas próprias rotas
const users = require('./users')

// MIDDLEWARES PARA PROCESSAR DADOS
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

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

// MONTA o módulo de rotas em um prefixo de caminho
// Todas as rotas do 'users' router estarão disponíveis sob /users
// Exemplo: /users/add, /users/save, /users/:id
app.use('/users', users)

// ROTA RAIZ principal
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

// Servidor escutando
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
