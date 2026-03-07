/**
 * MONGOOSE - REMOVENDO DOCUMENTOS
 * ===============================
 * Demonstra como deletar documentos do MongoDB com Mongoose
 * Usa métodos como .deleteOne(), .deleteMany(), .findByIdAndDelete()
 * Exemplifica como remover um registro do banco de dados
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
