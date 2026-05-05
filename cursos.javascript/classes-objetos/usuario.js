class Usuario {
    constructor(nome, idade, tipo){
        this.nome = nome;
        this.idade = idade;
        this.tipo = tipo;
    }
    exibirInfo(){
        return `Usuario: ${this.nome}, Idade: ${this.idade}, Tipo: ${this.tipo}`;
    }
    pegarLivro(){
        return ` ${this.nome} pegou um livro.`;
    }
}
module.exports = Usuario;