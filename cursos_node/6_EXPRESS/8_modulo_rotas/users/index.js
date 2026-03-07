// ARQUIVO: Módulo de Rotas de Usuários
// DESCRIÇÃO: Define todas as rotas relacionadas a usuários (adicionar, salvar, visualizar)
// CONCEITOS: express.Router(), rotas modulares, export de router

var express = require('express') // Importa Express
var router = express.Router() // Cria um novo router (como um mini-app para rotas)

const path = require('path') // Módulo path

// Caminho relativo para ir um nível acima (../) e acessar templates
const basePath = path.join(__dirname, '../templates')

// ROTA GET /add: Exibe o formulário de adicionar usuário
// Quando montado em /users no arquivo principal, será /users/add
router.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`)
})

// ROTA POST /save: Processa os dados do formulário
// Quando montado em /users no arquivo principal, será /users/save
router.post('/save', (req, res) => {
  console.log(req.body) // Loga todos os dados recebidos
  const name = req.body.name // Obtém o nome
  const age = req.body.age // Obtém a idade

  console.log(name)
  console.log(age)
  // Aqui você poderia salvar no banco de dados
})

// ROTA GET /:id: Exibe um usuário específico pelo ID
// Quando montado em /users no arquivo principal, será /users/:id
router.get('/:id', (req, res) => {
  console.log(`Carregando usuário: ${req.params.id}`)

  res.sendFile(`${basePath}/users.html`)
})

// EXPORTA este router para ser usado em outro arquivo
module.exports = router
