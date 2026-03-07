// ARQUIVO: Servindo Arquivos Estáticos (CSS, JS, Imagens)
// DESCRIÇÃO: Demonstra como servir arquivos estáticos (CSS, JS) usando express.static
// CONCEITOS: express.static(), pasta public, arquivos estáticos, caminho relativo

const express = require('express') // Framework Express
const app = express() // Aplicação Express
const port = 3000 // Porta

const path = require('path') // Módulo path

// Caminho base
const basePath = path.join(__dirname, 'templates')

// IMPORTA módulo de rotas de usuários
const users = require('./users')

// MIDDLEWARES PARA PROCESSAR DADOS
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

// MIDDLEWARE PARA SERVIR ARQUIVOS ESTÁTICOS
// Declara a pasta 'public' como diretório de arquivos estáticos
// Agora qualquer arquivo em public/ pode ser acessado diretamente pelo navegador
// Exemplo: public/style.css -> http://localhost:3000/style.css
// Exemplo: public/script.js -> http://localhost:3000/script.js
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

// MONTA módulo de rotas de usuários
app.use('/users', users)

// ROTA RAIZ principal
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

// Servidor escutando
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
