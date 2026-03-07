// ========================================
// SEQUELIZE - EDITANDO DADOS (PREPARANDO PARA UPDATE)
// ========================================
// Este arquivo demonstra como BUSCAR um registro para editá-lo.
// O padrão é: buscar o registro, exibir formulário de edição, depois atualizar.

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
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})

app.get('/users/:id', function (req, res) {
  const id = req.params.id

  User.findOne({
    raw: true,
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user)
      res.render('userview', { user })
    })
    .catch((err) => console.log(err))
})

app.post('/users/delete/:id', function (req, res) {
  const id = req.params.id

  User.destroy({
    where: {
      id: id,
    },
  })
    .then((user) => {
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

// Rota GET /users/edit/:id - busca um usuário para editá-lo
app.get('/users/edit/:id', function (req, res) {
  const id = req.params.id

  // User.findOne() - busca o usuário que será editado
  User.findOne({
    raw: true,
    where: {
      id: id, // Busca por ID
    },
  })
    .then((user) => {
      console.log(user)
      res.render('useredit', { user }) // Exibe formulário de edição
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
