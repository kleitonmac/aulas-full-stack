// ========================================
// SEQUELIZE - DELETANDO DADOS RELACIONADOS
// ========================================
// Este arquivo demonstra como REMOVER endereços relacionados.
// Um endereço sempre pertence a um usuário, então deletamos pelo ID do endereço.

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const User = require('./models/User')
const Address = require('./models/Address')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

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

// Rota GET /users/edit/:id - busca usuário COM TODOS seus endereços
app.get('/users/edit/:id', function (req, res) {
  const id = req.params.id

  User.findOne({
    include: Address, // Traz todos os endereços do usuário
    where: {
      id: id,
    },
  })
    .then((user) => {
      res.render('useredit', { user: user.get({ plain: true }) })
    })
    .catch((err) => console.log(err))
})

app.post('/users/update', function (req, res) {
  const id = req.body.id
  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if (newsletter === 'on') {
    newsletter = true
  } else {
    newsletter = false
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  }

  console.log(req.body)
  console.log(userData)

  User.update(userData, {
    where: {
      id: id,
    },
  })
    .then((user) => {
      console.log(user)
      res.redirect('/')
    })
    .catch((err) => console.log(err))
})

app.post('/address/create', function (req, res) {
  const UserId = req.body.UserId
  const street = req.body.street
  const number = req.body.number
  const city = req.body.city

  const address = {
    street,
    number,
    city,
    UserId,
  }

  Address.create(address)
    .then(res.redirect(`/users/edit/${UserId}`))
    .catch((err) => console.log(err))
})
// Rota POST /address/delete - DELETA um endereço relacionado
app.post('/address/delete/', function (req, res) {
  const id = req.body.id

  // Address.destroy() - DELETA um endereço específico pelo ID
  Address.destroy({
    where: {
      id: id, // Deleta o endereço com este ID
    },
  })
    .then(res.redirect('/')) // Redireciona para a página inicial
    .then(res.redirect('/'))
    .catch((err) => console.log(err))
})

// Criar tabelas e rodar o app
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
