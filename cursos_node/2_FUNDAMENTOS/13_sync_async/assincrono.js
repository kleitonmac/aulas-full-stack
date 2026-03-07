// Operação ASSINGÓCRONA com o módulo 'fs' (File System)
// A operação não-bloqueante (Async) permite que o programa continue executando

const fs = require('fs')

// Imprimir "Início" no console
console.log('Início')

// fs.writeFile() escreve em um arquivo de forma ASSINCRÓNA (não-bloqueante)
// O programa NÃO aguarda esse comando terminar para continuar
fs.writeFile('arquivo.txt', 'Oi', function (err) {
  // Esta função callback será executada depois de 1 segundo (após o arquivo ser criado)
  setTimeout(function () {
    console.log('Arquivo criado!')
  }, 1000)
})

// Imprimir "Fim" no console
// Este console.log() será executado IMEDIATAMENTE, antes do arquivo ser criado
console.log('Fim')
