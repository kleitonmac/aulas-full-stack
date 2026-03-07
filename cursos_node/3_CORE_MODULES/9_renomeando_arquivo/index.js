// Usar fs.rename() para renomear (mover) um arquivo

const fs = require('fs')

// fs.rename() renomeia ou move um arquivo de forma assíncrona
// Parâmetros: nome atual, novo nome, e uma função de callback
fs.rename('arquivo.txt', 'novoarquivo.txt', function (err) {
  // Se houver erro na renomeação
  if (err) {
    console.log(err)
    return
  }
  // Se bem-sucedido
  console.log('Arquivo renomeado!')
})
