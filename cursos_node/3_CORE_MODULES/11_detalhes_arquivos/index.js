// Usar fs.stat() para obter informações detalhadas sobre um arquivo

const fs = require('fs')

// fs.stat() retorna um objeto com informações sobre o arquivo
fs.stat('novoarquivo.txt', (err, stats) => {
  // Se houver erro
  if (err) {
    console.error(err)
    return
  }

  // stats.isFile() verifica se é um arquivo
  console.log(stats.isFile())

  // stats.isDirectory() verifica se é um diretório
  console.log(stats.isDirectory())

  // stats.isSymbolicLink() verifica se é um link simbólico
  console.log(stats.isSymbolicLink())

  // stats.ctime mostra quando o arquivo foi criado
  console.log(stats.ctime)

  // stats.size mostra o tamanho do arquivo em bytes
  console.log(stats.size)
})
