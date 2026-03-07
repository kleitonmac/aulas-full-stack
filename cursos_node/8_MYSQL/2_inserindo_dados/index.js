// ARQUIVO: Inserindo Dados no MySQL
// DESCRIÇÃO: Demonstra como receber dados via formulário e inseri-los no banco MySQL
// CONCEITOS: INSERT, formulário POST, query(), middleware urlencoded

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Template Handlebars
const mysql = require('mysql') // Módulo MySQL

const app = express() // Aplicação Express

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// MIDDLEWARES PARA PROCESSAR DADOS
// urlencoded para ler dados de formulário HTML
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// json para ler dados JSON
app.use(express.json())

// Servir arquivos estáticos
app.use(express.static('public'))

// ROTA principal
app.get('/', function (req, res) {
  res.render('home')
})

// ROTA POST: Recebe dados do formulário e insere no banco
app.post('/books/insertbook', function (req, res) {
  // Extrai os dados do formulário enviados no corpo da requisição
  const title = req.body.title
  const pageqty = req.body.pageqty

  // Cria query SQL para inserir os dados na tabela 'books'
  const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`

  // Executa a query no banco de dados
  conn.query(query, function (err) {
    if (err) {
      console.log(err) // Se houver erro, exibe
    }

    // Após inserir, redireciona para página inicial
    res.redirect('/')
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
