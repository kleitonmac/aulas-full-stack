/**
 * MONGODB - DELETANDO/REMOVENDO DADOS
 * ===================================
 * Demonstra como remover documents do MongoDB
 * Exemplifica operações de DELETE (D do CRUD)
 * Mostra like como deletar um registro por ID
 */

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

const productsRoutes = require('./routes/productsRoutes')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/', productsRoutes)

app.listen(3000)
