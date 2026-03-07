// ARQUIVO: Tarefa 4 - Loja Virtual com Handlebars
// DESCRIÇÃO: Aplicação de loja virtual com listagem e detalhes de produtos
// CONCEITOS: rotas dinâmicas, templates, dados de produtos, renderização

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Handlebars

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// MIDDLEWARE PARA ARQUIVOS ESTÁTICOS
app.use(express.static('public'))

// BASE DE DADOS: Array de produtos (em uma aplicação real, seria um banco de dados)
const products = [
  {
    id: '1',
    title: 'Livro',
    price: 12.9,
  },
  {
    id: '2',
    title: 'Cadeira',
    price: 200.99,
  },
  {
    id: '3',
    title: 'Lâmpada',
    price: 2.0,
  },
]

// ROTA 1: Página inicial - Lista todos os produtos
app.get('/', function (req, res) {
  // Passa o array de produtos para o template
  // No template: {{#each products}} ... {{/each}}
  res.render('home', { products })
})

// ROTA 2: Página de detalhe do produto
app.get('/product/:id', function (req, res) {
  // Busca o produto pelo ID (a posição no array)
  const product = products[req.params.id]

  // Renderiza página com os detalhes do produto
  res.render('product', { product })
})

app.listen(3000)
