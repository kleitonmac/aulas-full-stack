// Laçar (throw) um erro personalizado quando a validação falha

const x = '10'

// Verificar se 'x' é um número inteiro
// Number.isInteger() retorna true se for inteiro, false caso contrário
if (!Number.isInteger(x)) {
  // Se não for inteiro, lançar um erro com uma mensagem personalizada
  throw new Error('O valor de x não é um número inteiro')
}
