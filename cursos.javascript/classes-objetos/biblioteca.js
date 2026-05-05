class Biblioteca {
    constructor(nome) {
        this.nome = nome;
        this.livros = [];
    }
    adicionarLivro(livro) {
        this.livros.push(livro);
        console.log(`Livro adicionado à biblioteca "${livro.titulo}"`);
    }
    listaLivros() {
        console.log(`Arcevos Livros "${this.nome}":`);
        this.livros.forEach((livro, index) => {
            console.log(`${index + 1}. ${livro.exibirDetalhes()}`);
        });
    }   
}

module.exports = Biblioteca;