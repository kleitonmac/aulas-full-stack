// ========================================
// CONEXÃO COM BANCO DE DADOS
// ========================================
// Este arquivo configura a conexão Sequelize com o banco de dados MySQL.
// Esta é parte do Model na arquitetura MVC.

const { Sequelize } = require('sequelize')

// Cria instância do Sequelize com credenciais de conexão
const sequelize = new Sequelize('nodemvc', 'root', '', {
  host: 'localhost', // Servidor do banco
  dialect: 'mysql', // Tipo de banco de dados
})

// Tenta autenticar a conexão
try {
  sequelize.authenticate()
  console.log('Conectamos com o Sequelize!')
} catch (error) {
  console.error('Não foi possível conectar:', error)
}

// Exporta a instância para ser usada em modelos
exports.default = sequelize
