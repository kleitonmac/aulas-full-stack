// Usar um pacote de forma GLOBAL (instalado globalmente no sistema)
// Este pacote pode ser usado em qualquer projeto
// Comando de instalação: npm link lodash (ou npm install -g lodash)

const _ = require('lodash')

// Array com elementos duplicados
const arr = [1, 2, 2, 3, 4, 5, 6, 6, 7, 8, 8]

// _.sortedUniq() retorna um array ordenado sem elementos duplicados
console.log(_.sortedUniq(arr))
// Resultado: [1, 2, 3, 4, 5, 6, 7, 8]
