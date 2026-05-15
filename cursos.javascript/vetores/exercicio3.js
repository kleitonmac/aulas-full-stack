// exercicio 3
// Mostre para o usuário quais valores são maiores ou menores ou iguais a 10

const valores = [5, 12, 3, 8, 20]
console.log("Vector Completo: " + valores)
console.log('\n')

for (let cont = 0; cont < valores.length; cont++) {
    if (valores[cont] > 10) {
        console.log("Valores maiores que 10: ", valores[cont])
    }
    else {
        console.log("Valores menores ou iguais a 10: ", valores[cont])
    }
}

