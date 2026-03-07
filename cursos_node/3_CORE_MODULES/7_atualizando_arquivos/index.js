// Usar fs.appendFile() para ADICIONAR conteúdo a um arquivo existente

const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
  // Analisar a URL
  var urlInfo = require('url').parse(req.url, true)
  const name = urlInfo.query.name

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  // Se nenhum nome foi fornecido, exibir formulário
  if (!name) {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      res.write(data)
      return res.end()
    })
  } else {
    // Adicionar uma quebra de linha após o nome
    const nameNewLine = name + '\r\n'

    // fs.appendFile() ADICIONA t extofinal do arquivo (não sobrescreve)
    fs.appendFile('arquivo.txt', nameNewLine, function (err, data) {
      // Redirecionar de volta para a página inicial
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
