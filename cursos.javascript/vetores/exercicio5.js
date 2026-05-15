// exercicio 5 encontre o maior valor dentro do vetor
const valores = [3, 2, 9, 5, 4, 0, 7, 6, 1]

let maior = valores[0]

for (let i = 1; i < valores.length; i++) {
    if (valores[i] > maior) {
        maior = valores[i]
    }
}

console.log("O maior valor é: " + maior)