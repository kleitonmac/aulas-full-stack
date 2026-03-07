// ========================================
// ARQUITETURA MVC - EDITANDO TAREFAS (PREPARAÇÃO)
// ========================================
// Este arquivo demonstra como PREPARAR a edição (buscar dados para formulário).
// A operação UPDATE começa buscando o registro atual.

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

const Task = require('./models/Task')

const taskRoutes = require('./routes/tasksRoutes')

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

app.use('/tasks', taskRoutes)

conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
