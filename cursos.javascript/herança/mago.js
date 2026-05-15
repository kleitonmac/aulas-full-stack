const Personagem = require('./personagem.js');

class Mago extends Personagem {
    constructor(nome, nivel, xp, poderMagico) { // herda o nome do pai
        super(nome, nivel, xp); // herda do pai
        this.poderMagico = poderMagico; // herda o poder magico do pai
    }

    exibirStatus() { // herda o metodo exibirStatus do pai
        return `${super.exibirStatus()}, Poder Mágico: ${this.poderMagico}`;
    }
    lancarMagia(dano) { // herda o metodo lancarMagia do pai
        return `${this.nome} lançou uma magia causando ${dano} de dano.`
    }
}

module.exports = Mago;