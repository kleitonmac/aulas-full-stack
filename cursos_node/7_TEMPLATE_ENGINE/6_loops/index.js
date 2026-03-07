// ARQUIVO: Loops em Templates
// DESCRIÇÃO: Demonstra iteração sobre arrays usando #each em Handlebars
// CONCEITOS: loops, each, iteração de arrays, renderização de dados repetidos

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Handlebars

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// ROTA 1: Página inicial
app.get('/', function (req, res) {
  const user = {
    name: 'Matheus',
    surname: 'Battisti',
  }

  res.render('home', { user: user, auth: true })
})

// ROTA 2: Dashboard com lista de itens
app.get('/dashboard', function (req, res) {
  // Array de itens
  const items = ['Item a', 'Item b', 'Item c']

  // No template, você pode usar {{#each items}} para iterar sobre cada item
  // Cada item estará disponível como {{this}}
  res.render('dashboard', { items: items })
})

app.listen(3000)
