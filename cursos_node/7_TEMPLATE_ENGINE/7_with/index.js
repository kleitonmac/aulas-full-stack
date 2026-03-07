// ARQUIVO: Helper #with para Simplificar Acesso a Propriedades
// DESCRIÇÃO: Demonstra uso do helper #with para acessar propriedades de objetos
// CONCEITOS: helper with, acesso a propriedades, simplificação de templates

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

// ROTA 2: Dashboard com lista
app.get('/dashboard', function (req, res) {
  const items = ['Item a', 'Item b', 'Item c']

  res.render('dashboard', { items: items })
})

// ROTA 3: Post individual com muitos dados
app.get('/post', function (req, res) {
  const post = {
    title: 'Aprender Node.js',
    category: 'Node.js',
    body: 'Node.js é muito utilizado na programação hoje em dia',
    comments: 4,
  }

  // No template, você pode usar {{#with post}} ... {{/with}}
  // Dentro do bloco with, você acessa {{title}}, {{category}}, etc. diretamente
  // Em vez de {{post.title}}, {{post.category}}, etc.
  res.render('blogpost', { post })
})

app.listen(3000)
