// Retornar HTML como resposta do servidor HTTP

const http = require('http')

const port = 3000

const server = http.createServer((req, res) => {
  // res.statusCode define o código HTTP de status (200 = OK)
  res.statusCode = 200

  // res.setHeader() define os headers da resposta
  // 'Content-Type': 'text/html' indica que o conteúdo é HTML
  res.setHeader('Content-Type', 'text/html')

  // res.end() finaliza a resposta e envia o HTML
  res.end('<h1>Olá, este é o meu primeiro server!</h1>')
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
