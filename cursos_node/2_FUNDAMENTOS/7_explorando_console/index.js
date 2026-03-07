// Explorando diferentes funcionalidades do console

// Imprimir múltiplos valores na mesma linha
const x = 10
const y = 'Matheus'
console.log(x, y)

// console.count() conta quantas vezes uma mensagem foi exibida
console.count('O valor de x é: ' + x + ' -> contagem:')
console.count('O valor de x é: ' + x + ' -> contagem:')
console.count('O valor de x é: ' + x + ' -> contagem:')
console.count('O valor de y é: ' + y + ' -> contagem:')

// Usar %s como placeholder para inserir variáveis em strings
console.log('O nome dele é %s', y)

// console.clear() limpa o console após 2000 milissegundos (2 segundos)
setTimeout(() => {
  console.clear()
}, 2000)
