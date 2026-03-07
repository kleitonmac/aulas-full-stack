// ARQUIVO: Resgatando (SELECT) Dados do MySQL
// DESCRIÇÃO: Demonstra como recuperar todos os registros de uma tabela
// CONCEITOS: SELECT, query(), callback com dados (err, data)

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Template Handlebars
const mysql = require('mysql') // Módulo MySQL

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// MIDDLEWARES PARA PROCESSAR DADOS
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

// ROTA GET: Lista todos os livros do banco de dados
app.get('/books', function (req, res) {
  // Query SQL para recuperar todos os registros da tabela 'books'
  const query = `SELECT * FROM books`

  // Executa a query e recebe os dados
  conn.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }

    // 'data' é um array com todos os registros retornados
    const books = data

    console.log(data) // Exibe os dados no console do servidor

    // Passa os dados para o template renderizar
    res.render('books', { books })
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
