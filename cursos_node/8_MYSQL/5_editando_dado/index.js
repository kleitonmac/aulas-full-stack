// ARQUIVO: Editando Dados - Página de Edição
// DESCRIÇÃO: Página que exibe formulário para editar um livro existente
// CONCEITOS: GET para exibir formulário, form preenchido com dados

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Template Handlebars
const mysql = require('mysql') // Módulo MySQL

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// MIDDLEWARES
app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

// ROTA principal
app.get('/', function (req, res) {
  res.render('home')
})

// ROTA POST: Insere novo livro
app.post('/books/insertbook', function (req, res) {
  const title = req.body.title
  const pageqty = req.body.pageqty

  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`

  conn.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

// ROTA GET: Lista todos os livros
app.get('/books', function (req, res) {
  const query = `SELECT * FROM books`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const books = data

    console.log(data)

    res.render('books', { books })
  })
})

// ROTA GET: Recupera um livro específico pelo ID
app.get('/books/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('book', { book })
  })
})

// ROTA GET: Exibe página de edição com formulário preenchido
app.get('/books/edit/:id', function (req, res) {
  const id = req.params.id

  // Recupera o livro do banco de dados
  const query = `SELECT * FROM books WHERE id = ${id}`

  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    // Pega o primeiro resultado
    const book = data[0]

    console.log(data[0])

    // Renderiza template de edição com o livro preenchido
    res.render('editbook', { book })
  })
})

// CONFIGURAÇÃO DA CONEXÃO MySQL
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodemysql',
})

conn.connect(function (err) {
  if (err) {
    console.log(err)
  }

  console.log('Conectado ao MySQL!')

  app.listen(3000)
})
