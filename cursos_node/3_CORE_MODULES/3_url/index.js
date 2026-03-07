// Usar o módulo 'url' para analisar e extrair informações de uma URL

const url = require('url')

// URL completa a ser analisada
const address = 'https://www.meusite.com.br/catalogo?produtos=cadeira'

// new url.URL() cria um objeto com informações da URL
const parsedUrl = new url.URL(address)

// Exibir o host (domínio)
console.log(parsedUrl.host) // www.meusite.com.br

// Exibir o caminho (pathname)
console.log(parsedUrl.pathname) // /catalogo

// Exibir a string de query (parâmetros)
console.log(parsedUrl.search) // ?produtos=cadeira

// Exibir todos os parâmetros
console.log(parsedUrl.searchParams) // URLSearchParams

// Exibir o valor do parâmetro 'produtos'
console.log(parsedUrl.searchParams.get('produtos')) // cadeira
