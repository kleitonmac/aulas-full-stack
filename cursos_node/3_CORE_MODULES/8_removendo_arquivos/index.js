// Usar fs.unlink() para remover (deletar) um arquivo

const fs = require('fs')

// fs.unlink() remove um arquivo de forma assíncrona
// Parâmetros: caminho do arquivo e uma função de callback
fs.unlink('arquivo.txt', function (err) {
  // Se houver erro na remoção
  if (err) {
    console.log(err)
    return
  }
  // Se bem-sucedido
  console.log('Arquivo removido!')
})
