// Usar o módulo 'os' (Operating System) para obter informações do sistema

const os = require('os')

// os.cpus() retorna informações sobre os processadores do computador
console.log(os.cpus())

// os.freemem() retorna a quantidade de memória RAM disponível (em bytes)
console.log(os.freemem())

// os.homedir() retorna o caminho do diretório home do usuário
console.log(os.homedir())

// os.type() retorna o tipo do sistema operacional (Windows, Linux, Darwin, etc)
console.log(os.type())
