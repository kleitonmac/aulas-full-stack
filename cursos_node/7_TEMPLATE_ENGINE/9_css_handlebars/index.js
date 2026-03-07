// ARQUIVO: CSS com Handlebars
// DESCRIÇÃO: Demonstra integração de CSS (arquivo estático) com templates Handlebars
// CONCEITOS: express.static(), arquivos públicos, CSS estilização, partials

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Handlebars

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE COM PARTIALS
const hbs = exphbs.create({
  partialsDir: ['views/partials/'],
})

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

// MIDDLEWARE PARA SERVIR ARQUIVOS ESTÁTICOS
// Permite servir CSS, JS, imagens da pasta public
app.use(express.static('public'))

// ROTA 1: Página inicial
app.get('/', function (req, res) {
  const user = {
    name: 'Matheus',
    surname: 'Battisti',
  }

  res.render('home', { user: user, auth: true })
})

// ROTA 2: Dashboard
app.get('/dashboard', function (req, res) {
  const items = ['Item a', 'Item b', 'Item c']

  res.render('dashboard', { items: items })
})

// ROTA 3: Post individual
app.get('/post', function (req, res) {
  const post = {
    title: 'Aprender Node.js',
    category: 'Node.js',
    body: 'Node.js é muito utilizado na programação hoje em dia',
    comments: 4,
  }

  res.render('blogpost', { post })
})

// ROTA 4: Página de blog
app.get('/blog', function (req, res) {
  const posts = [
    {
      title: 'Aprender Node.js',
      category: 'Node.js',
      body: 'Node.js é muito utilizado na programação hoje em dia',
      comments: 4,
    },
    {
      title: 'PHP ainda vale a pena?',
      category: 'PHP',
      body: '',
      comments: 12,
    },
    {
      title: 'Os segredos de JavaScript',
      category: 'JavaScript',
      body: '',
      comments: 5,
    },
  ]

  // express.static('public') permite que arquivos CSS em public/ sejam carregados automaticamente
  res.render('blog', { posts })
})

app.listen(3000)
