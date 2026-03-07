// ARQUIVO: Partials (Componentes Reutilizáveis)
// DESCRIÇÃO: Demonstra uso de partials para reutilizar componentes HTML
// CONCEITOS: partials, reutilização de código, componentes modulares

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Handlebars

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE COM PARTIALS
// partialsDir especifica o diretório onde os partials estão localizados
const hbs = exphbs.create({
  partialsDir: ['views/partials/'],
})

app.engine('handlebars', hbs.engine)
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

// ROTA 4: Página de blog com múltiplos posts
app.get('/blog', function (req, res) {
  // Array com múltiplos posts
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

  // No template, você pode usar {{>postcustomizado}} para incluir partials
  // Cada post pode ser renderizado com um partial reutilizável
  res.render('blog', { posts })
})

app.listen(3000)
