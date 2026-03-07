// ARQUIVO: Módulo de Rotas de Usuários (para 404)
// DESCRIÇÃO: Define rotas de usuários (mesmo do anterior, mas usado com página 404)
// CONCEITOS: express.Router(), modularização de rotas

var express = require('express') // Importa Express
var router = express.Router() // Cria um router para rotas de usuário

const path = require('path') // Módulo path

// Caminho relativo para ir um nível acima e acessar templates
const basePath = path.join(__dirname, '../templates')

// ROTA GET /add: Exibe formulário para adicionar usuário
router.get('/add', (req, res) => {
  res.sendFile(`${basePath}/userform.html`)
})

// ROTA POST /save: Processa dados do formulário
router.post('/save', (req, res) => {
  console.log(req.body)
  const name = req.body.name
  const age = req.body.age

  console.log(name)
  console.log(age)
})

// ROTA GET /:id: Carrega um usuário específico
router.get('/:id', (req, res) => {
  console.log(`Carregando usuário: ${req.params.id}`)

  res.sendFile(`${basePath}/users.html`)
})

// EXPORTA o router
module.exports = router
