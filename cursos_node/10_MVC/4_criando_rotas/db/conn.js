// ========================================
// CONEXÃO COM BANCO DE DADOS
// ========================================
// Este arquivo configura a conexão Sequelize com o banco de dados MySQL.

const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodemvc', 'root', '', {
  host: 'localhost', // Servidor do banco
  dialect: 'mysql', // Tipo de banco de dados
})

try {
  sequelize.authenticate()
  console.log('Conectamos com o Sequelize!')
} catch (error) {
  console.error('Não foi possível conectar:', error)
}

module.exports = sequelize
