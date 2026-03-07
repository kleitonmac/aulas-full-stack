// ARQUIVO: Tarefa 3 - Aplicação de Projetos com Rotas Modulares
// DESCRIÇÃO: Aplicação que gerencia projetos usando rotas modulares e arquivos estáticos
// CONCEITOS: app.use(), express.static(), require de módulos, modularização

const express = require('express') // Framework Express
const app = express() // Instância da aplicação
const port = 5000 // Porta do servidor (diferente dos exemplos anteriores)

// IMPORTA o módulo de rotas de projetos de um arquivo separado
const projects = require('./projects')

// Middleware para servir arquivos estáticos da pasta public
// Isso permite servir CSS, JS, imagens, etc. sem precisar de rotas explícitas
app.use(express.static('public'))

// MONTA o módulo de rotas de projetos sob o prefixo /projects
// Todas as rotas do projects router estarão disponíveis em /projects
app.use('/projects', projects)

// Servidor escutando na porta 5000
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
