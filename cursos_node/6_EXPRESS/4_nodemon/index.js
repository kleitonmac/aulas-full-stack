// ARQUIVO: Configuração com Nodemon
// DESCRIÇÃO: Mesmo código anterior, mas agora rodando com nodemon para hot reload
// CONCEITOS: nodemon reinicia automaticamente o servidor quando o código muda
// DICA: No package.json, use "nodemon index.js" para executar com auto-reload

const express = require('express') // Importa Express
const app = express() // Cria aplicação Express
const port = 3000 // Define porta

const path = require('path') // Módulo de caminho (path)

// Obtém o caminho absoluto da pasta 'templates'
const basePath = path.join(__dirname, 'templates')

// Rota raiz que retorna arquivo HTML
app.get('/', (req, res) => {
  res.sendFile(`${basePath}/index.html`)
})

// Inicia o servidor
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`)
  console.log(
    'Com nodemon, o servidor reinicia automaticamente ao salvar mudanças!',
  )
})
