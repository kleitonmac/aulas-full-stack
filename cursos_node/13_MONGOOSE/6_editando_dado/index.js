/**
 * MONGOOSE - EDITANDO DOCUMENTOS (PÃGINA DE EDIÇÃO)
 * ================================================
 * Demonstra como exibir a página de edição de um documento
 * Busca o documento e exibe um formulário com os dados atuais
 * Prepara os dados para se rem alterados
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
