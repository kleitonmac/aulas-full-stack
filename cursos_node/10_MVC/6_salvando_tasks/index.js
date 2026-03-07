// ========================================
// ARQUITETURA MVC - SALVANDO TAREFAS
// ========================================
// Este arquivo demonstra como salvar dados no banco de dados via formulário.
// As tarefas criadas são persistidas no banco (operação CREATE).

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

// Importa o Model Task
const Task = require('./models/Task')

// Importa as rotas
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
