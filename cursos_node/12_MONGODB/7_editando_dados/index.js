/**
 * MONGODB - EDITANDO DADOS (PÁGINA DE EDIÇÃO)
 * ==========================================
 * Demonstra como atualizar documents no MongoDB
 * Exemplifica operações de UPDATE (U do CRUD)
 * Este arquivo mostra a página de edição para modificar um registro
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
