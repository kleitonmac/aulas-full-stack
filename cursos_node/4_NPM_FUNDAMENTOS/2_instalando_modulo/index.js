// Usar o módulo 'lodash' - uma biblioteca útil com funções para manipular arrays e objetos
// Este módulo foi instalado via npm (npm install lodash)

const _ = require('lodash')

// Dois arrays diferentes
const a = [1, 2, 3, 4, 5]
const b = [2, 4, 5, 6, 7, 8]

// _.difference() retorna os elementos que estão em 'a' mas não estão em 'b'
const diff = _.difference(a, b)

// Exibir: [1, 3]
console.log(diff)
