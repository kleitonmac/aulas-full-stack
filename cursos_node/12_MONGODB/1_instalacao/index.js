/**
 * MONGODB - INSTALAÇÃO E CONFIGURAÇÃO
 * ====================================
 * Demonstra como configurar uma aplicação Express com MongoDB
 * Este arquivo exemplifica:
 * - Import do Express e Handlebars
 * - Configuração do motor de templates
 * - Middleware para processar dados do formulário e JSON
 */

const express = require('express')
const exphbs = require('express-handlebars')
const app = express()

// Importa a função run que conecta ao MongoDB (ver db/conn.js)
const conn = require('./db/conn').run

// Configura o motor de renderização de templates (Handlebars)
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Middleware: processa dados de formulários POST
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware: processa dados JSON enviados na requisição
app.use(express.json())
