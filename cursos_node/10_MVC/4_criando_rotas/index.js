// ========================================
// ARQUITETURA MVC - ADICIONANDO ROTAS
// ========================================
// Este arquivo demonstra como adicionar as ROTAS à arquitetura MVC.
// As rotas mapeiam URLs para ações do Controller.
// Padrão: cada rota chama um método do Controller correspondente.

const express = require('express')
const exphbs = require('express-handlebars')

const app = express()

const conn = require('./db/conn')

// Importa o Model Task
const Task = require('./models/Task')

// Importa o arquivo de rotas
const taskRoutes = require('./routes/tasksRoutes')

// Configura o Handlebars como view engine
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())

app.use(express.static('public'))

// Registra as rotas de tarefas com prefix '/tasks'
// Todas as rotas em tasksRoutes serão prefixadas com /tasks
app.use('/tasks', taskRoutes)

// Sincroniza os models e inicia o servidor
conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
