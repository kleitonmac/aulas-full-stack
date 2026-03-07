// Entender a ordem de execucão (Order c -> a -> b)

// Declarar a função 'a'
function a() {
  console.log('Executando a()')
}

// Declarar a função 'b'
function b() {
  console.log('Executando b()')
}

// Declarar a função 'c' que chama as funções 'a' e 'b'
function c() {
  console.log('Executando c()')
  a() // Chamar a funcao 'a'
  b() // Chamar a funcao 'b'
}

// Executar a função 'c', que resultará na ordem: c -> a -> b
c()
