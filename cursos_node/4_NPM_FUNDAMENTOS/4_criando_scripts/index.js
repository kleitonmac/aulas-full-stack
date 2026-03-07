// Exemplo de uso de scripts personalizados configurados no package.json
// Este arquivo é executado quando você roda: npm run merge

const _ = require('lodash')
const chalk = require('chalk')

// Dois arrays
const a = [1, 2, 3]
const b = [4, 5, 6]

// _.merge() combina os arrays
const diff = _.merge(a, b)

// Exibir em vermelho e negrito
console.log(chalk.red.bold(diff))
