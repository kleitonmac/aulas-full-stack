// ARQUIVO: Criando Layouts com Handlebars
// DESCRIÇÃO: Demonstra uso de layouts para reutilizar estrutura HTML comum
// CONCEITOS: layouts, views, templates, reutilização de código

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Handlebars

const app = express() // Aplicação

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')
// Nota: Sem layout: false, o template será renderizado DENTRO do layout padrão

// ROTA: Renderiza com layout
app.get('/', function (req, res) {
  // render() processa home.handlebars e coloca o conteúdo dentro do layout.handlebars
  // Layout é lido de views/layouts/main.handlebars por padrão
  res.render('home')
})

app.listen(3000)
