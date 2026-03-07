// Exemplo de uso de módulos
// Se um destes módulos for removido (npm uninstall <nomemodulo>),
// o require() vai gerar um erro

const _ = require('lodash')
const chalk = require('chalk')

// Dois arrays
const a = [1, 2, 3]
const b = [4, 5, 6]

// _.merge() combina os dois arrays
const diff = _.merge(a, b)

// Exibir em vermelho e negrito com chalk
console.log(chalk.red.bold(diff))
