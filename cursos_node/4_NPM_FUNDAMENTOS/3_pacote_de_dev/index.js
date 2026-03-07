// Usar módulos instalados localmente no projeto
// lodash: manipula arrays e objetos de forma funcional
// chalk: coloriza textos no console

const _ = require('lodash')
const chalk = require('chalk')

// Dois arrays
const a = [1, 2, 3]
const b = [4, 5, 6]

// _.merge() combina dois arrays em um único array
const diff = _.merge(a, b)

// Exibir o resultado em vermelho e negrito
console.log(chalk.red.bold(diff))
