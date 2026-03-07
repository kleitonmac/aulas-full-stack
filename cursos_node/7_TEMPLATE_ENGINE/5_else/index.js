// ARQUIVO: Estruturas Else em Condicionais
// DESCRIÇÃO: Demonstra uso de else em condicionais de templates Handlebars
// CONCEITOS: if/else, lógica condicional, valores booleanos

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

  // Passa múltiplos dados: user, auth e approved
  // No template: {{#if approved}} ... {{else}} ... {{/if}}
  res.render('home', { user: user, auth: true, approved: false })
})

// ROTA 2: Dashboard
app.get('/dashboard', function (req, res) {
  res.render('dashboard')
})

app.listen(3000)
