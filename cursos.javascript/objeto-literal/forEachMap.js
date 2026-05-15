// Utilizando forEach
console.log("Utilizando forEach");

// Array com vários números
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Função que recebe um número por vez
function multiplicar(numero) {
    console.log("O dobro com forEach:", numero * 2);
}

// forEach percorre o array item por item
numeros.forEach(multiplicar);


// Utilizando map
console.log("\n\nUtilizando map");

// map percorre o array e cria um novo array com os valores transformados
const dobro = numeros.map((num) => {
    return `O dobro com map: ${num * 2}`;
});

// Exibe o novo array criado pelo map
console.log("O dobro com map:", dobro);