// ========================================
// ARQUITETURA MVC - ADICIONANDO CSS
// ========================================
// Este arquivo mantém a estrutura MVC com CSS adicionado ao projeto.
// Nesta etapa, o projeto ganhou estilos visuais (views com CSS).

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

app.use(express.static('public')) // Serve CSS, JS, imagens da pasta public

app.use('/tasks', taskRoutes)

conn
  .sync()
  .then(() => {
    app.listen(3000)
  })
  .catch((err) => console.log(err))
