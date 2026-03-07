// Operação SÍNCRONA com o módulo 'fs' (File System)
// A operação bloqueante (Sync) aguarda o arquivo ser escrito para continuar

const fs = require('fs')

// Imprimir "Início" no console
console.log('Início')

// fs.writeFileSync() escreve em um arquivo de forma SÍNCRONA (bloqueante)
// O programa aguarda esse comando terminar antes de continuar
fs.writeFileSync('arquivo.txt', 'Oi')

// Imprimir "Fim" no console
// Este console.log() só será executado DEPOIS que o arquivo for criado
console.log('Fim')
