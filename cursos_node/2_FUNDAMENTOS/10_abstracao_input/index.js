// Usar o módulo 'inquirer' para criar interf.js interfaces interativas mais avanc.js
const inquirer = require('inquirer')

// inquirer.prompt() cria um formulário interativo com múltiplas perguntas
inquirer
  .prompt([
    { name: 'p1', message: 'Qual a primeira nota?' },
    { name: 'p2', message: 'Qual a segunda nota?' },
  ])
  .then((answers) => {
    // Se bem-sucedido, exibir as respostas
    console.log(answers)

    // Calcular a média das duas notas
    const media = (parseInt(answers.p1) + parseInt(answers.p2)) / 2

    // Exibir o resultado da média
    console.log(`A média do aluno é ${media}`)
  })
  .catch((err) => {
    // Se houver erro, exibir a mensagem de erro
    console.log(err)
  })
