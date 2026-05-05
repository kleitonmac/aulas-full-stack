class Livro {
    constructor(titulo, autor, ano) {
        this.titulo = titulo;
        this.autor = autor;
        this.ano = ano;
    }
    exibirDetalhes(){
        return `Livro: ${this.titulo}, Autor: ${this.autor}, Ano: ${this.ano}`;
    }
}
module.exports = Livro;