// Combinar HTTP, FS e URL para ler dados de um formulário e escrever em um arquivo

const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
  // Analisar a URL para extrair parâmetros
  var urlInfo = require('url').parse(req.url, true)
  const name = urlInfo.query.name

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  // Se nenhum nome foi fornecido, ler e exibir o formulário
  if (!name) {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end()
    })
  } else {
    // Se um nome foi fornecido, escrever em um arquivo
    fs.writeFile('arquivo.txt', name, function (err, data) {
      // Redirecionar para a página inicial após escrever
      res.writeHead(302, {
        Location: '/',
      })
      return res.end()
    })
  }
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
