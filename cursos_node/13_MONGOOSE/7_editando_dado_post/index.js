/**
 * MONGOOSE - EDITANDO DOCUMENTOS (POST)
 * =====================================
 * Processa o formulário de edição e atualiza o documento no MongoDB
 * Usa .updateOne(), .findByIdAndUpdate() ou método customizado
 * Salva as alterações permanentemente no banco de dados
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

app.use('/products', productsRoutes)

app.listen(3000)
