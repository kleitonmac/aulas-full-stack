// Ler entrada do usuário de forma interativa usando o módulo 'readline'

// require('readline').createInterface() cria uma interface para ler dados de entrada
const readline = require('readline').createInterface({
  input: process.stdin, // Entrada padrão (teclado do usuário)
  output: process.stdout, // Saída padrão (tela do computador)
})

// readline.question() faz uma pergunta e espera pela resposta do usuário
readline.question(`Qual a sua linguagem preferida? `, (language) => {
  // 'language' contém a resposta do usuário
  console.log(`A minha linguagem preferida é: ${language}`)

  // readline.close() fecha a interface
  readline.close()
})
