/**
 * MODELO DE PENSAMENTO (TOUGHT)
 * ===============================
 * Define a estrutura da tabela 'Tought' no banco de dados
 * Cada pensamento pertence a um usuário
 */

const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const User = require('../models/User')

// Define o modelo Tought (Pensamento) com seus campos
const Tought = db.define('Tought', {
  // Campo: título/conteúdo do pensamento
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

// RELACIONAMENTOS: define a relação entre Tought e User
// Um pensamento pertence a um usuário
Tought.belongsTo(User)
// Um usuário pode ter muitos pensamentos
User.hasMany(Tought)

module.exports = Tought
