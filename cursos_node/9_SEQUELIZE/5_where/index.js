// ========================================
// SEQUELIZE - BUSCANDO COM FILTROS (WHERE)
// ========================================
// Este arquivo demonstra como buscar registros com condições específicas.
// A cláusula WHERE permite filtrar dados por critérios.

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const User = require('./models/User')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

// Rota GET / - lista todos os usuários
app.get('/', function (req, res) {
  User.findAll({ raw: true })
    .then((users) => {
      console.log(users)
      res.render('home', { users: users })
    })
    .catch((err) => console.log(err))
})

app.get('/users/create', function (req, res) {
  res.render('adduser')
})

app.post('/users/create', function (req, res) {
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  }

  User.create({ name, occupation, newsletter })

  res.redirect('/')
})

// Rota GET /users/:id - busca um usuário específco por ID
app.get('/users/:id', function (req, res) {
  const id = req.params.id

  // User.findOne() - busca UM registro que atenda às condições
  // where: { id: id } - ClÁUSULA WHERE: filtra por ID
  User.findOne({
    raw: true,
    where: {
      id: id, // Busca o usuário com este ID específfico
    },
  })
    .then((user) => {
      console.log(user)
      res.render('userview', { user }) // Exibe a página do usuário
    })
    .catch((err) => console.log(err))
})

// Sincroniza e inicia o servidor
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
