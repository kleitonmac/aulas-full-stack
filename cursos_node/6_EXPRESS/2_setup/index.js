// ARQUIVO: Setup básico do Express
// DESCRIÇÃO: Demonstra a configuração inicial de um servidor Express com uma rota GET simples
// CONCEITOS: módulo Express, criação de app, definição de rota, escuta de porta

const express = require('express') // Importa o framework Express para criar servidor web
const app = express() // Cria uma nova instância da aplicação Express
const port = 3000 // Define a porta onde o servidor irá rodar

// ROTA GET para a raiz do servidor (/)
// Quando alguém acessar http://localhost:3000/, esta função será executada
app.get('/', (req, res) => {
  // req: objeto com informações da requisição do cliente
  // res: objeto para enviar resposta ao cliente
  res.send('Olá Mundo!!') // Envia uma resposta de texto simples
})

// Inicia o servidor na porta especificada
app.listen(port, () => {
  console.log(`App rodando na porta:${port}`) // Exibe mensagem confirming que servidor está ativo
})
