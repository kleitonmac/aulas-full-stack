// Usar o módulo 'fs' (File System) para ler arquivos e servir via HTTP

const http = require('http')
const fs = require('fs')

const port = 3000

const server = http.createServer((req, res) => {
  // fs.readFile() lê um arquivo de forma assíncrona
  fs.readFile('mensagem.html', function (err, data) {
    // res.writeHead() define o status e os headers
    res.writeHead(200, { 'Content-Type': 'text/html' })

    // res.write() escreve o conteúdo do arquivo
    res.write(data)

    // res.end() finaliza a resposta
    return res.end()
  })
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
