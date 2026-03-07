// Tarefa 02: Criar um programa interativo que pergunta nome e idade
// Usar o módulo 'inquirer' para criar um formulário
// Usar o módulo 'chalk' para colorir a saída

const inquirer = require('inquirer')
const chalk = require('chalk')

// Criar um formulário com duas perguntas
inquirer
  .prompt([
    { name: 'nome', message: 'Qual o seu nome?' },
    { name: 'idade', message: 'Qual a sua idade?' },
  ])
  .then((answers) => {
    // Se bem-sucedido, construir a resposta com os dados do usuário
    const response = `O nome do usuário é ${answers.nome} e ele tem ${answers.idade} anos`

    // Exibir a resposta com fundo amarelo e texto preto
    console.log(chalk.bgYellow.black(response))
  })
  .catch((err) => {
    // Se houver erro, exibir a mensagem de erro
    console.log(err)
  })
