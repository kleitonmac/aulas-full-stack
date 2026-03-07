// ARQUIVO: Connection Pool
// DESCRIÇÃO: Demonstra uso de pool de conexões para melhor gerenciamento de recursos
// CONCEITOS: pool, método mais eficiente, arquivo de configuração separado (db/conn)

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Template Handlebars

// Importa o pool de conexões do arquivo db/conn
// Isto é mais eficiente que criar conexão com createConnection
// Pool reaproveita conexões, economizando recursos
const pool = require('./db/conn')

console.log(pool) // Exibe informações do pool

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

  // Usa pool em vez de conn
  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect('/')
  })
})

// ROTA GET: Lista todos os livros
app.get('/books', function (req, res) {
  const query = `SELECT * FROM books`

  console.log('TEste')

  // Usa pool
  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const books = data

    console.log(data)

    res.render('books', { books })
  })
})

// ROTA GET: Recupera um livro específico
app.get('/books/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('book', { book })
  })
})

// ROTA GET: Página de edição
app.get('/books/edit/:id', function (req, res) {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    const book = data[0]

    console.log(data[0])

    res.render('editbook', { book })
  })
})

// ROTA POST: Atualiza dados do livro
app.post('/books/updatebook', function (req, res) {
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pageqty

  const query = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books/edit/${id}`)
  })
})

// ROTA POST: Remove um livro
app.post('/books/remove/:id', function (req, res) {
  const id = req.params.id

  const query = `DELETE FROM books WHERE id = ${id}`

  pool.query(query, function (err) {
    if (err) {
      console.log(err)
    }

    res.redirect(`/books`)
  })
})

// Servidor escutando
app.listen(3000)
