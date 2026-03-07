// Criar um servidor com roteamento simples (404 page)
// O servidor verifica se o arquivo solicitado existe

const http = require('http')
const fs = require('fs')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
  // Analisar a URL e extrair o pathname
  var q = url.parse(req.url, true)
  var filename = q.pathname.substring(1) // Remove a primeira '/' da path

  console.log(filename)

  // Verificar se o arquivo requerido é um HTML
  if (filename.includes('html')) {
    // Verificar se o arquivo existe
    if (fs.existsSync(filename)) {
      // Se existe, ler e servir o arquivo
      fs.readFile(filename, function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(data)
        return res.end()
      })
    } else {
      // Se não existe, servir a página 404
      fs.readFile('404.html', function (err, data) {
        res.writeHead(404, { 'Content-Type': 'text/html' })
        res.write(data)
        return res.end()
      })
    }
  }
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
