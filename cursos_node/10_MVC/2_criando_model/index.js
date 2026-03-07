// ========================================
// ARQUITETURA MVC - ADICIONANDO MODEL
// ========================================
// Este arquivo demonstra como adicionar o Model à arquitetura MVC.
// O Model define a estrutura da tabela no banco de dados.

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

// Importa a conexão com banco de dados
const conn = require('./db/conn')

// Importa o Model Task (camada Model do MVC)
const Task = require('./models/Task')

// Configura o Handlebars (camada View do MVC)
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

// Sincroniza os models com o banco (cria tabelas se não existirem)
// Depois inicia o servidor
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
