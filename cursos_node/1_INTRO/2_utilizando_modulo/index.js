// Utilizando o módulo 'fs' (File System) do Node.js
// Este módulo permite trabalhar com o sistema de arquivos
const fs = require('fs')

// fs.readFile() lê o conteúdo de um arquivo
// Parâmetros: caminho do arquivo, codificação, e uma função callback
// A função callback recebe dois argumentos: err (erro) e data (conteúdo do arquivo)
fs.readFile('arquivo.txt', 'utf8', (err, data) => {
  // Se houver erro na leitura, o 'err' conterá a informação do erro
  // Se não houver erro, 'data' conterá o conteúdo do arquivo
  console.log(data)
})
