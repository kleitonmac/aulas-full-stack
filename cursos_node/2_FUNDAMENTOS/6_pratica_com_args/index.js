// Prática com argumentos e módulos
// Exemplo de execução: node index.js --a=10 --b=20

// Importar módulo externo (minimist) para processar argumentos
const minimist = require('minimist')

// Importar módulo interno (meu_modulo) que contém a função soma
const meuModulo = require('./meu_modulo')
const soma = meuModulo.soma

// Processar os argumentos da linha de comando
const args = minimist(process.argv.slice(2))

// Extrair os valores de 'a' e 'b' dos argumentos
const a = args['a']
const b = args['b']

// Chamar a função soma com os argumentos recebidos
soma(a, b)
