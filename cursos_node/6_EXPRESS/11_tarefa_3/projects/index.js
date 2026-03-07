// ARQUIVO: Módulo de Rotas de Projetos
// DESCRIÇÃO: Define rotas para operações com projetos (listar todos, ver detalhes)
// CONCEITOS: express.Router(), rotas com parâmetros, export de router

var express = require('express') // Importa Express
var router = express.Router() // Cria um router para projetos

const path = require('path') // Módulo path

// Caminho relativo para acessar pasta templates
const basePath = path.join(__dirname, '../templates')

// ROTA GET /: Lista todos os projetos
// Quando montado em /projects, será a rota GET /projects
router.get('/', (req, res) => {
  res.sendFile(`${basePath}/projects.html`)
})

// ROTA GET /:id: Exibe detalhes de um projeto específico
// :id é um parâmetro dinâmico que pode ser qualquer valor
router.get('/:id', (req, res) => {
  res.sendFile(`${basePath}/project.html`)
})

// EXPORTA o router
module.exports = router
