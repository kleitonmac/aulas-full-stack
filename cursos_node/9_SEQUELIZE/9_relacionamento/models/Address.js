// ========================================
// MODEL (MODELO) - ENDEREÇO
// ========================================
// Este arquivo define o modelo 'Address' que representa a tabela de endereços.
// Cada endereço pertence a um usuário (relacionamento: Address belongsTo User).

const { DataTypes } = require('sequelize')

const db = require('../db/conn')

// Importa o modelo User para estabelecer relacionamento
const User = require('./User')

// Define o modelo 'Address'
const Address = db.define('Address', {
  // Campo 'street': nome da rua
  street: {
    type: DataTypes.STRING, // Tipo: texto
    allowNull: false, // Obrigatório
  },
  // Campo 'number': número da casa
  number: {
    type: DataTypes.STRING, // Tipo: texto (pode ter letras)
  },
  // Campo 'city': cidade
  city: {
    type: DataTypes.STRING, // Tipo: texto
  },
})

// RELACIONAMENTO: belongsTo significa que cada Address pertence a UM User
// Isso cria uma chave estrangeira (UserId) na tabela Address
Address.belongsTo(User)

// Exporta o modelo para ser usado em outros arquivos
module.exports = Address
