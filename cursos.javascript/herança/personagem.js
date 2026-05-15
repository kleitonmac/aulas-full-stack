// heranças 
class Personagem {

    constructor(nome, nivel, xp) { // herda o nome, nivel e xp do pai
        this.nome = nome; // herda o nome do pai
        this.nivel = nivel; // herda o nivel do pai
        this.xp = xp; // herda o xp do pai
    }
    exibirStatus() { // herda o metodo exibirStatus do pai
        return `Nome: ${this.nome}, Nível: ${this.nivel}, XP: ${this.xp}`;
    }
    ganharXp(valor) { // herda o metodo ganharXp do pai
        this.xp += valor;
        return `XP ganho: ${this.nome} agora tem ${valor} XP.`;
    }
}

module.exports = Personagem;