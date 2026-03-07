// ARQUIVO: Renderização de HTML com Express
// DESCRIÇÃO: Configura o Express para servir arquivos HTML estáticos
// CONCEITOS: path module, diretórios, sendFile, rotas para HTML

const express = require('express') // Importa o framework Express
const app = express() // Cria instância da aplicação
const port = 3000 // Porto do servidor

const path = require('path') // Módulo para trabalhar com caminhos de arquivo e diretório

// __dirname é variável global que contém o caminho absoluto do diretório atual
// Cria o caminho completo para a pasta 'templates' onde os arquivos HTML estão
const basePath = path.join(__dirname, 'templates')

// ROTA GET que serve um arquivo HTML em vez de apenas texto
app.get('/', (req, res) => {
  // sendFile() envia um arquivo como resposta
  // O navegador irá exibir o conteúdo HTML do arquivo
  res.sendFile(`${basePath}/index.html`)
})

// Servidor escutando na porta especificada
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
})
