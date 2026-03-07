/**
 * MONGOOSE - BUSCANDO DOCUMENTO INDIVIDUAL
 * =========================================
 * Demonstra como buscar um documento específico pelo ID
 * Usa findById() ou findOne() para retornar um único documento
 * Ütl para exibir detalhes de um item
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
