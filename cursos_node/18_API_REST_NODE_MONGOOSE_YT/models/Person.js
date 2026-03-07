/**
 * MODELO PERSON
 * ==============
 * Define a estrutura de dados para uma Pessoa
 * Usa Mongoose para criar um schema que será armazenado no MongoDB
 */

const mongoose = require('mongoose')

// Define o modelo Person com os campos: name, salary, approved
const Person = mongoose.model('Person', {
  name: String, // Nome: tipo texto
  salary: Number, // Salário: tipo número
  approved: Boolean, // Aprovado: tipo booleano (verdadeiro/falso)
})

module.exports = Person
