// Usar o módulo 'path' para trabalhar com caminhos de arquivos

const path = require('path')

// Caminho customizado
const customPath = '/relatorios/matheus/relatorio1.pdf'

// path.dirname() retorna o diretório do arquivo (sem o nome do arquivo)
console.log(path.dirname(customPath)) // /relatorios/matheus

// path.basename() retorna apenas o nome do arquivo (com extensão)
console.log(path.basename(customPath)) // relatorio1.pdf

// path.extname() retorna apenas a extensão do arquivo
console.log(path.extname(customPath)) // .pdf
