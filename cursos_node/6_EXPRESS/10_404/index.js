// ARQUIVO: Tratamento de Erro 404 (Página Não Encontrada)
// DESCRIÇÃO: Demonstra como criar página customizada para rotas inexistentes
// CONCEITOS: middleware de erro 404, serve404, ordem de middlewares (deve ser último)

const express = require('express') // Framework Express
const app = express() // Aplicação Express
const port = 3000 // Porta do servidor

const path = require('path') // Módulo path

// Caminho base
const basePath = path.join(__dirname, 'templates')

// IMPORTA o módulo de rotas de usuário
const users = require('./users')

// MIDDLEWARES PARA PROCESSAR DADOS
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// Middleware para servir arquivos estáticos da pasta public (CSS, JS, imagens)
app.use(express.static('public'))

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

// MONTA o módulo de rotas de usuários
app.use('/users', users)

// ROTA RAIZ principal
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

// MIDDLWARE DE ERRO 404: Deve ser o Último middleware!
// Este middleware captura TODAS as requisições que não foram tratadas pelas rotas acima
// Quando nenhuma outra rota corresponder, este middleware executará
app.use(function (req, res, next) {
  // Define o status HTTP 404 (Não Encontrado) e envia um arquivo HTML customizado
  res.status(404).sendFile(`${basePath}/404.html`)
})

// Servidor escutando
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
