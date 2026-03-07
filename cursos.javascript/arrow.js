// ===============================
// FUNÇÃO TRADICIONAL (FUNCTION)
// ===============================

// Aqui estamos criando uma função usando uma EXPRESSÃO DE FUNÇÃO
// A função recebe dois parâmetros (a e b)
// e retorna a soma deles
const soma = function soma(a, b) {
    return a + b; // retorna o resultado da soma
};

// ===============================
// ARROW FUNCTION
// ===============================

// Arrow Function é uma forma mais curta e moderna de escrever funções
// Ela NÃO cria seu próprio "this" (importante para objetos e classes)
const somaArrow = (a, b) => {
    return a + b; // mesmo comportamento da função tradicional
};

// Chamando (executando) as funções
console.log(soma(10, 10));       // saída: 20
console.log(somaArrow(10, 10));  // saída: 20


// ===============================
// ARROW FUNCTION COM CONDIÇÃO
// ===============================

// Função que recebe um parâmetro chamado "nome"
const greeting = (nome) => {

    // Verifica se o nome foi informado
    if (nome) {
        // Concatena a string com o nome
        return "Olá " + nome + "!";
    } else {
        // Caso nenhum nome seja passado
        return "Olá";
    }
};

// Executando a função e passando um argumento
console.log(greeting("Kleiton")); // saída: Olá Kleiton!

// Aqui NÃO estamos executando a função
// Estamos apenas exibindo a referência dela na memória
console.log(greeting);


// ===============================
// USO DO THIS EM FUNÇÃO NORMAL
// ===============================

// Criando um objeto com propriedades e métodos
const user = {
    name: "Lana",

    // Método usando função tradicional
    sayUserName() {

        // Em funções normais, o "this" muda de contexto
        // Por isso, salvamos o this em uma variável auxiliar
        var self = this;

        setTimeout(function () {
            // Aqui o this NÃO aponta para o objeto user
            // Por isso usamos a variável self
            console.log(self);
            console.log("Username: " + self.name);
        }, 500);
    },

    // ===============================
    // USO DO THIS COM ARROW FUNCTION
    // ===============================

    // Arrow function NÃO cria um novo this
    // Ela herda o this do escopo onde foi criada
    sayUserNameArrow() {
        setTimeout(() => {
            // Aqui o this continua sendo o objeto user
            console.log(this);
            console.log("Username: " + this.name);
        }, 700);
    }
};

// Executando os métodos
user.sayUserName();
user.sayUserNameArrow();


// ===============================
// OUTRO EXEMPLO DE THIS COM ARROW
// ===============================

const time = {
    name: "Flamengo",

    sayUserTeam() {
        setTimeout(() => {
            // O this continua apontando para o objeto "time"
            console.log(this);
        }, 500);
    },
};

time.sayUserTeam();


// ===============================
// MÉTODO FILTER
// ===============================

// Array de números
const arr = [1, 2, 3, 4, 5];

// filter percorre o array
// e retorna um NOVO array apenas com os valores que retornarem true
const highNumbers = arr.filter((n) => {

    // Se o número for maior ou igual a 3
    if (n >= 3) {
        return true; // mantém o elemento no novo array
    }
});

console.log(highNumbers); // saída: [3, 4, 5]


// ===============================
// FILTER COM OBJETOS
// ===============================

const users = [
    { name: "kleiton", available: true },
    { name: "kleisson", available: false },
    { name: "alana", available: true },
    { name: "isabel", available: true },
    { name: "luzia", available: false },
];

// Retorna apenas usuários disponíveis
const availableUsers = users.filter((user) => user.available);

// Retorna apenas usuários indisponíveis
const notavailableUsers = users.filter((user) => !user.available);

console.log(availableUsers);
console.log(notavailableUsers);


// ===============================
// MÉTODO MAP
// ===============================

// map percorre o array
// e permite MODIFICAR ou CRIAR novos valores
const products = [
    { name: "Camisa", price: 38.99, category: "Roupas" },
    { name: "Notebook", price: 2238.99, category: "Eletro" },
    { name: "Fogão", price: 638.99, category: "Eletro" },
    { name: "Mesa", price: 738.99, category: "Moveis" },
    { name: "Bermuda", price: 58.99, category: "Roupas" },
];

// Adiciona a propriedade onSale apenas nos produtos da categoria "Roupas"
products.map((product) => {
    if (product.category === "Roupas") {
        product.onSale = true;
    }
});

console.log(products);


// ===============================
// TEMPLATE LITERALS
// ===============================

// Variáveis simples
const userName = "Kleiton";
const age = 28;

// Template literals permitem interpolar variáveis com ${}
console.log(`O nome do usuário é ${userName} e ele tem ${age} anos`);


// ===============================
// DESTRUCTURING COM ARRAYS
// ===============================

const frutas = ['maça', 'banana', 'pera', 'caju'];

// Cada posição do array é atribuída a uma variável
const [f1, f2, f3, f4] = frutas;

console.log('Destructuring com Arrays:', f3); // pera


// ===============================
// DESTRUCTURING COM OBJETOS
// ===============================

const productDetails = {
    name: 'rtx5090',
    price: 5000,
    cor: 'branco',
    category: 'hardware'
};

// Extraindo propriedades do objeto
const { name, price, cor, category } = productDetails;

console.log(`O nome do produto é ${name}, ele custará ${price}, sua cor é ${cor} e a categoria é ${category}`);


// ===============================
// SPREAD OPERATOR
// ===============================

// Arrays
const a1 = [1, 2, 3];
const a2 = [4, 5, 6];

// Junta os dois arrays em um novo
const a3 = [...a1, ...a2];

console.log(`Spread operator em arrays: ${a3}`);


// Objetos
const carName = { name: 'Corsa' };
const carBrand = { brand: 'Chevrolet' };
const otherInfo = { km: 1000, price: 30000 };

// Junta todos os objetos em um único
const car = { ...carName, ...carBrand, ...otherInfo };

console.log(`Spread operator em objetos: ${JSON.stringify(car)}`);


// ===============================
// CLASSES
// ===============================

// Classe representa um "molde" para criar objetos
class Products {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }

    // Método para calcular desconto
    productWithDiscount(discount) {
        return this.price * ((100 - discount) / 100);
    }
}

const shirt = new Products('Camisa gola v', 20);

console.log(shirt.name);
console.log(shirt.productWithDiscount(30));
console.log(shirt.productWithDiscount(50));


// ===============================
// HERANÇA
// ===============================

// Essa classe herda tudo da classe Products
class ProductsWithAtributes extends Products {
    constructor(name, price, colors) {
        super(name, price); // chama o construtor da classe pai
        this.colors = colors;
    }

    // Método específico dessa classe
    showColors() {
        console.log("As cores são:");
        this.colors.forEach((color) => {
            console.log(color);
        });
    }
}

const hat = new ProductsWithAtributes(
    "Chapéu",
    29.99,
    ['preto', 'rosa', 'roxo']
);

console.log(hat.name);
console.log(hat.productWithDiscount(10));
hat.showColors();
