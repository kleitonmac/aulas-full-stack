// ARQUIVO: Condicionais em Templates
// DESCRIÇÃO: Demonstra uso de estruturas condicionais (if/then) em templates Handlebars
// CONCEITOS: condicional if, lógica de templates, verificação de variáveis

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Handlebars

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// ROTA 1: Página inicial com autenticação
app.get('/', function (req, res) {
  const user = {
    name: 'Matheus',
    surname: 'Battisti',
  }

  // No template, você pode usar {{#if auth}} para testar se auth é verdadeiro
  // Exemplo: {{#if auth}} <p>Bem-vindo!</p> {{/if}}
  res.render('home', { user: user, auth: true })
})

// ROTA 2: Dashboard com lista
app.get('/dashboard', function (req, res) {
  // Renderiza template dashboard com dados vazio ou preenchido
  res.render('dashboard')
})

app.listen(3000)
