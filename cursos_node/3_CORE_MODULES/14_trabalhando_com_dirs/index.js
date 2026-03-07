// Trabalhar com diretórios: verificar existência e criar novos diretórios

const fs = require('fs')

// fs.existsSync() verifica se um diretório (ou arquivo) existe
// Retorna true se existir, false caso contrário
if (!fs.existsSync('./minhapasta')) {
  console.log('Não existe')
}

// fs.mkdirSync() cria um novo diretório de forma síncrona (bloqueante)
fs.mkdirSync('minhapasta')

// Verificar novamente se o diretório foi criado com sucesso
if (fs.existsSync('minhapasta')) {
  console.log('Existe')
}
