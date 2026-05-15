const Personagem = require('./personagem.js');

class Guerreiro extends Personagem { // herda do pai
    constructor(nome, nivel, xp, ataque, defesa) { // herda o nome, nivel e xp do pai
        super(nome, nivel, xp); // herda o nome, nivel e xp do pai
        this.ataque = ataque; // herda o ataque do pai
        this.defesa = defesa; // herda a defesa do pai
    }

    exibirStatus() { // herda o metodo exibirStatus do pai
        return `${super.exibirStatus()}, Ataque: ${this.ataque}, Defesa: ${this.defesa}`;
    }

    atacar() { // herda o metodo atacar do pai
        return `${this.nome} atacou com ${this.ataque} de dano.`;
    }

    defender() { // herda o metodo defender do pai
        return `${this.nome} defendeu com ${this.defesa} de defesa.`;
    }
}

module.exports = Guerreiro;