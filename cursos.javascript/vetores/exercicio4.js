const numeros = [2, 4, 6, 8, 10, 12]

let soma = 0 // escopo global

for (let i = 0; i < numeros.length; i++) {
    soma += numeros[i]
}
console.log("A soma total é: " + soma)