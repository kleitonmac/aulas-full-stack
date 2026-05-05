const Usuario = require('./usuario');
const Livro = require('./livro');
const Biblioteca = require('./biblioteca');


// criando usuários
const usuario1 = new Usuario('Alice', 30, 'Estudante');
const usuario2 = new Usuario('Bob', 45, 'Professor');


// criar livros
const livro1 = new Livro('JavaScript para Iniciantes', 'John Doe', 2020);
const livro2 = new Livro('Aprendendo Node.js', 'Jane Smith', 2021);

// Criando uma biblioteca
const minhaBiblioteca = new Biblioteca('Biblioteca Central');

// Adicionando livros à biblioteca
minhaBiblioteca.adicionarLivro(livro1);
minhaBiblioteca.adicionarLivro(livro2);


minhaBiblioteca.listaLivros();

console.log(`\n Usuários Cadastrados:`);
console.log(usuario1.exibirInfo());
console.log(usuario2.exibirInfo());

console.log(usuario1.pegarLivro());
console.log(`\n Livros Disponíveis:`);
minhaBiblioteca.listaLivros();
