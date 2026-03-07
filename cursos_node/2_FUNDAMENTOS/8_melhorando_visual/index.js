// Usar o módulo 'chalk' para colorir e estilizar textos no console
const chalk = require('chalk')

// Variável com a nota do aluno
const nota = 8

// Verificar se o aluno passou (nota >= 7)
if (nota >= 7) {
  // Se passou, exibir mensagem em verde e negrito
  console.log(chalk.green.bold('Parabéns, você passou!'))
} else {
  // Se não passou, exibir mensagem com fundo vermelho e texto preto
  console.log(chalk.bgRed.black('Você precisa fazer a prova final!'))
}
