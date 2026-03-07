/**
 * MONGODB - BUSCANDO UM DOCUMENTO ESPECÍFICO
 * ==========================================
 * Demonstra como buscar um documento único no MongoDB
 * Exemplifica busca por ID e filtros de busca
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
