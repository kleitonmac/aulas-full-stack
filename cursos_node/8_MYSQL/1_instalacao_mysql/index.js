// ARQUIVO: Configuração Básica de Conexão MySQL
// DESCRIÇÃO: Demonstra como conectar um servidor Express a um banco de dados MySQL
// CONCEITOS: mysql module, criação de conexão, connect(), credenciais

const express = require('express') // Framework Express
const exphbs = require('express-handlebars') // Template engine Handlebars
const mysql = require('mysql') // Módulo MySQL para conexão com banco de dados

const app = express() // Aplicação Express

// CONFIGURAÇÃO DO TEMPLATE ENGINE
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// MIDDLEWARE PARA ARQUIVOS ESTÁTICOS
app.use(express.static('public'))

// ROTA principal
app.get('/', function (req, res) {
  res.render('home')
})

// CONFIGURAÇÃO DA CONEXÃO COM MYSQL
// Define as credenciais e parâmetros de conexão
const conn = mysql.createConnection({
  host: 'localhost', // Servidor do MySQL (local neste caso)
  user: 'root', // Usuário do MySQL
  password: '', // Senha do MySQL (vazio neste exemplo)
  database: 'nodemysql', // Banco de dados a conectar
})

// CONECTAR AO MYSQL
// Esta função estabelece a conexão com o banco de dados
conn.connect(function (err) {
  if (err) {
    console.log(err) // Se houver erro, exibe no console
  }

  console.log('Conectado ao MySQL!')

  // Inicia o servidor somente após conectar ao MySQL
  app.listen(3000)
})
