// Usar o módulo 'path' do Node.js
// Este módulo fornece utilitários para trabalhar com caminhos de arquivos e diretórios
const path = require('path')

// path.extname() retorna a extensão do arquivo
// No caso, retornará '.php' do arquivo 'arquivo.php'
const extension = path.extname('arquivo.php')

// Exibir a extensão: .php
console.log(extension)
