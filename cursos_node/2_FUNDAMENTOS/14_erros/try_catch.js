// Capturar (catch) um erro usando try/catch
// Isso evita que o programa quebre quando um erro ocorre

const x = 10

// try: bloco onde o código pode gerar um erro
try {
  // Tentar atribuir um novo valor a 'x'
  // Isso vai gerar um erro porque 'x' foi declarada como const
  x = 2
} catch (err) {
  // catch: bloco que é executado se houver um erro no try
  // 'err' contém as informações do erro
  console.log(`Erro: ${err}`)
}
