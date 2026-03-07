// Utilizar um módulo externo (minimist) para facilitar a leitura de argumentos
// Exemplo de execução: node index.js --nome=Matheus --idade=30

// Importar o módulo 'minimist' (deve estar instalado via npm)
const minimist = require('minimist')

// minimist processa os argumentos e retorna um objeto com as chaves e valores
const args = minimist(process.argv.slice(2))

// Exibir o objeto completo de argumentos
console.log(args)

// Acessar valores específicos pelo nome da chave
const nome = args['nome']
const idade = args['idade']

// Exibir o nome
console.log(nome)
// Exibir a idade
console.log(idade)
