const Personagem = require('./personagem.js');
const Guerreiro = require('./guerreiro.js');
const Mago = require('./mago.js');

const guerreiro = new Guerreiro('Thor', 10, 1000, 100, 50); // cria um novo guerreiro
const mago = new Mago('Merlin', 10, 1000, 100); // cria um novo mago


console.log('=========Status========='); // exibe o guerreiro
console.log(guerreiro.exibirStatus()); // exibe o status do guerreiro
console.log(mago.exibirStatus()); // exibe o status do mago
console.log('\n');

console.log('=========Ações========='); // exibe o guerreiro
console.log(guerreiro.atacar()); // exibe o ataque do guerreiro
console.log(mago.lancarMagia(100)); // exibe a magia do mago

console.log('\n====Progresso=====')
console.log(guerreiro.ganharXp(100)); // ganha XP
console.log(mago.ganharXp(100)); // ganha XP