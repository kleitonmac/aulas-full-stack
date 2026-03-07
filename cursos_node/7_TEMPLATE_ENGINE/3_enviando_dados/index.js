// ARQUIVO: Enviando Dados para Templates
// DESCRIÇÃO: Demonstra como passar dados do servidor para o template Handlebars
// CONCEITOS: passagem de dados, variáveis em templates, objetos

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Handlebars

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// ROTA: Renderiza template com dados
app.get('/', function (req, res) {
  // Cria um objeto com dados do usuário
  const user = {
    name: 'Matheus',
    surname: 'Battisti',
  }

  // render() passa o objeto user para o template home.handlebars
  // No template, você pode acessar os dados como {{user.name}} e {{user.surname}}
  res.render('home', { user: user })
})

app.listen(3000)
