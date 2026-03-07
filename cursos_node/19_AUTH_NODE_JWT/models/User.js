/**
 * MODELO DE USUÁRIO
 * ==================
 * Define a estrutura de dados para um Usuário
 * Armazena informações de login: name, email e senha criptografada
 */

const mongoose = require('mongoose')

// Define o modelo User com três campos principais
const User = mongoose.model('User', {
  name: String, // Nome do usuário
  email: String, // Email (deve ser único)
  password: String, // Senha criptografada com bcrypt
})

module.exports = User
