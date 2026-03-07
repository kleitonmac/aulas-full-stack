// Combinar HTTP e URL para criar um servidor com formulário

const http = require('http')
const url = require('url')

const port = 3000

const server = http.createServer((req, res) => {
  // Analisar a URL da requisição
  var urlInfo = require('url').parse(req.url, true)

  // Extrair o parâmetro 'name' da query string
  const name = urlInfo.query.name

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')

  // Se o nome não foi fornecido, exibir um formulário
  if (!name) {
    res.end(
      "<h1>Preencha seu nome:</h1><form method='GET'><input type='text' name='name'/><input type='submit' value='Enviar'></form>",
    )
  } else {
    // Se o nome foi fornecido, exibir uma mensagem de boas-vindas
    res.end(`<h1>Seja bem-vindo ${name}!</h1>`)
  }
})

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
