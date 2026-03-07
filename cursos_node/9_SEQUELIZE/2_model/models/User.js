// ========================================
// MODEL (MODELO) - USUÁRIO
// ========================================
// Este arquivo define o modelo 'User' que representa a tabela de usuários no banco de dados.
// Um modelo define a estrutura de uma tabela: quais campos ela tem e que tipo de dado cada um armazena.

const { DataTypes } = require('sequelize')

// Importa a conexão com o banco de dados
const db = require('../db/conn')

// Define o modelo 'User' com o método db.define()
// O Sequelize cria automaticamente uma tabela chamada 'Users' (plural) no banco
const User = db.define('User', {
  // Campo 'name': armazena o nome do usuário
  name: {
    type: DataTypes.STRING, // Tipo: texto (string)
    allowNull: false, // Não pode ser vazio
  },
  // Campo 'occupation': armazena a profissão do usuário
  occupation: {
    type: DataTypes.STRING, // Tipo: texto (string)
    // allowNull não está definido, então pode ser nulo (vazio)
  },
  // Campo 'newsletter': armazena se o usuário se inscreveu na newsletter
  newsletter: {
    type: DataTypes.BOOLEAN, // Tipo: booleano (verdadeiro/falso)
  },
})

// Exporta o modelo para ser usado em outros arquivos
module.exports = User
