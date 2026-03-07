// ========================================
// SEQUELIZE - ATUALIZANDO DADOS (UPDATE)
// ========================================
// Este arquivo demonstra como MODIFICAR registros existentes no banco usando Sequelize.
// A operação UPDATE altera os dados de um ou mais registros.

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

app.get('/users/edit/:id', function (req, res) {
  const id = req.params.id

  User.findOne({
    raw: true,
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user)
      res.render('useredit', { user })
    })
    .catch((err) => console.log(err))
})

// Rota POST /users/update - ATUALIZA um usuário existente
app.post('/users/update', function (req, res) {
  const id = req.body.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  // Converte o checkbox em booleano
  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  // Objeto com os dados a serem atualizados
  const userData = {
    id,
    name,
    occupation,
    newsletter,
  }

  console.log(req.body)
  console.log(userData)

  // User.update() - OPERAÇÃO UPDATE do CRUD
  // Primeiro argumento: dados a serem atualizados
  // Segundo argumento: condição WHERE (qual registro atualizar)
  User.update(userData, {
    where: {
      id: id, // Atualiza o usuário com este ID
    },
  })
    .then((user) => {
      console.log(user)
      res.redirect('/') // Redireciona após atualizar
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
