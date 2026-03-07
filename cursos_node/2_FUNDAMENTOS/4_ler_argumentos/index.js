// Ler argumentos passados via linha de comando
// Exemplo de execução: node index.js nome=Matheus

// process.argv contém todos os argumentos da linha de comando
// [0] = caminho do Node
// [1] = caminho do arquivo
// [2+] = argumentos passados
console.log(process.argv)

// slice(2) remove os dois primeiros elementos e mantém apenas os argumentos do usuário
const args = process.argv.slice(2)

console.log(args)

// Separar os argumentos pelo '=' e pegar o valor após o '='
const nome = args[0].split('=')[1]

// Exibir o nome extraído
console.log(nome)
