// ARQUIVO: Preparando Queries com Placeholders
// DESCRIÇÃO: Demonstra uso de placeholders (??) para segúrance contra SQL Injection
// CONCEITOS: prepared statements, placeholders (? e ??), segurança de dados

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Template Handlebars

// Importa o pool de conexões
const pool = require('./db/conn')

console.log(pool)

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

// ROTA POST: Insere novo livro COM PLACEHOLDERS (mais seguro)
app.post('/books/insertbook', function (req, res) {
  const title = req.body.title
  const pageqty = req.body.pageqty

  // Query usando placeholders (??) para nomes de colunas e (?) para valores
  // Isto protege contra SQL Injection
  const query = `INSERT INTO books (??, ??) VALUES (?, ?)`
  // Array com dados: primeiro 2 nomes de colunas, depois 2 valores
  const data = ['title', 'pageqty', title, pageqty]

  // pool.query recebe a query, os dados, e o callback
  pool.query(query, data, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

// ROTA GET: Lista todos os livros
app.get('/books', function (req, res) {
  const query = `SELECT * FROM books`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const books = data

    console.log(data)

    res.render('books', { books })
  })
})

// ROTA GET: Recupera um livro COM PLACEHOLDERS
app.get('/books/:id', function (req, res) {
  const id = req.params.id

  // (??) = placeholder para nome de coluna
  // (?) = placeholder para valor
  const query = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id] // Dados: nome da coluna e ID

  pool.query(query, data, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('book', { book })
  })
})

// ROTA GET: Página de edição COM PLACEHOLDERS
app.get('/books/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(query, data, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('editbook', { book })
  })
})

// ROTA POST: Atualiza dados COM PLACEHOLDERS
app.post('/books/updatebook', function (req, res) {
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  // Query com múltiplos placeholders
  const query = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
  // Array alternando nomes de colunas (????) com valores (?)
  const data = ['title', title, 'pageqty', pageqty, 'id', id]

  pool.query(query, data, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books/edit/${id}`)
  })
})

// ROTA POST: Remove um livro COM PLACEHOLDERS
app.post('/books/remove/:id', function (req, res) {
  const id = req.params.id

  const query = `DELETE FROM books WHERE ?? = ?`
  const data = ['id', id]

  pool.query(query, data, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books`)
  })
})

// Servidor escutando
app.listen(3000)
