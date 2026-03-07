// Usar o módulo 'path' para trabalhar com caminhos absolutos e relativos

const path = require('path')

// path.resolve() retorna o caminho absoluto (completo) de um arquivo
console.log(path.resolve('teste.txt'))

// Formar um caminho completo usando path.join()
const midFolder = 'relatorios'
const fileName = 'matheus.txt'

// path.join() junta vários segmentos de path em um único caminho
const finalPath = path.join('/', 'arquivos', midFolder, fileName)

// Exibir o caminho montado
console.log(finalPath)
