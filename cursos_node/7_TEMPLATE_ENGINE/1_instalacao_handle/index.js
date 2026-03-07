// ARQUIVO: Instalação básica do Handlebars
// DESCRIÇÃO: Demonstra configuração inicial do template engine Handlebars no Express
// CONCEITOS: express-handlebars, template engine, view engine, render

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Template engine Handlebars para Express

const app = express() // Instância da aplicação Express

// CONFIGURAÇÃO DO TEMPLATE ENGINE
// Diz ao Express para usar Handlebars como motor de templates
app.engine('handlebars', exphbs())
// Define Handlebars como view engine padrão
app.set('view engine', 'handlebars')

// ROTA: Renderiza um template sem layout
app.get('/', function (req, res) {
  // render() processa o arquivo home.handlebars na pasta views/
  // { layout: false } indica que não usará layout (será apenas o template)
  res.render('home', { layout: false })
})

app.listen(3000)
