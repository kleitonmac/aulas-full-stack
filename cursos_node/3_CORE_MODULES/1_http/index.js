// Usar o módulo 'http' do Node.js para criar um servidor web

const http = require('http')

// Porta em que o servidor vai escutar requisições
const port = 3000

// http.createServer() cria um servidor HTTP
// Ele recebe uma função callback com dois parâmetros: req (requisição) e res (resposta)
const server = http.createServer((req, res) => {
  // res.write() escreve dados na resposta
  res.write('Oi HTTP')

  // res.end() finaliza a resposta
  res.end()
})

// server.listen() faz o servidor escutar em uma porta específica
server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
