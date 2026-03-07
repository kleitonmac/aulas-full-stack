/**
 * MONGOOSE - INSTALAÇÃO E CONFIGURAÇÃO
 * =====================================
 * Mongoose é uma biblioteca ODM (Object Data Modeling) para MongoDB em Node.js
 * Facilita o trabalho com MongoDB usando schemas e modelos tipados
 * Este arquivo configura Express + Mongoose + Handlebars
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
