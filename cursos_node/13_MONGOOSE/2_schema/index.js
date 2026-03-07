/**
 * MONGOOSE - DEFININDO SCHEMAS
 * ============================
 * Schema é a estrutura que define como os dados serão organizados
 * Define tipos de dados, validações e comportamentos dos campos
 * Este arquivo exemplifica como criar um schema com Mongoose
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
