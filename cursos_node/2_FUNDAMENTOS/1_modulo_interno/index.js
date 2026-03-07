// Importar um módulo personalizado criado localmente
// require() carrega o módulo do arquivo 'meu_modulo.js'
const meuModulo = require('./meu_modulo')

// Extrair a função 'soma' do módulo importado
const soma = meuModulo.soma

// Chamar a função soma com os argumentos 2 e 3
// Resultado esperado: 5
soma(2, 3)
