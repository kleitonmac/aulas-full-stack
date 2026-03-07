// ARQUIVO: Recebendo Dados POST do Cliente
// DESCRIÇÃO: Demonstra como processar dados enviados via POST (formulário)
// CONCEITOS: POST, middleware express.urlencoded, express.json, req.body

const express = require('express') // Framework Express
const app = express() // Aplicação Express
const port = 3000 // Porta

const path = require('path') // Módulo path

// Caminho base para templates
const basePath = path.join(__dirname, 'templates')

// MIDDLEWARES PARA PROCESSAR DADOS DO FORMULÁRIO
// Middleware para ler dados de formulário HTML tradicional (urlencoded)
// extended: true permite processar strings complexas
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware para ler dados JSON enviados pelo cliente
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

// Aplica middleware
app.use(checkAuth)

// ROTA GET: Exibe o formulário para adicionar usuário
app.get('/users/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`)
})

// ROTA POST: Recebe e processa os dados do formulário
app.post('/users/save', (req, res) => {
  // req.body contém os dados enviados via POST
  console.log(req.body)

  // Extrai os valores específicos do formulário
  const name = req.body.name // Campo 'name' do formulário
  const age = req.body.age // Campo 'age' do formulário

  // Exibe os dados no console
  console.log(name)
  console.log(age)
  // Nota: Aqui você poderia salvar os dados em um banco de dados
})

// ROTA GET COM PARÂMETRO: Carrega página de usuário específico
app.get('/users/:id', (req, res) => {
  console.log(`Carregando usuário: ${req.params.id}`)

  res.sendFile(`${basePath}/users.html`)
})

// ROTA RAIZ
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
