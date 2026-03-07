// ========================================
// CONEXÃO COM BANCO DE DADOS USANDO SEQUELIZE
// ========================================
// Este arquivo configura a conexão do Sequelize com um banco de dados MySQL.
// O Sequelize é um ORM que abstrai as operações diretas de SQL em JavaScript.

const { Sequelize } = require('sequelize')

// Cria uma instância do Sequelize com os parâmetros de conexão:
// - 'nodesequelize': nome do banco de dados
// - 'root': usuário do banco (padrão MySQL)
// - '': senha (sem senha neste caso)
// - dialect: 'mysql' indica que estamos usando MySQL
const sequelize = new Sequelize('nodesequelize', 'root', '', {
  host: 'localhost', // Servidor do banco (localhost = máquina local)
  dialect: 'mysql', // Tipo de banco de dados
})

// Tenta autenticar a conexão com o banco de dados
try {
  sequelize.authenticate()
  console.log('Conectamos com o Sequelize!')
} catch (error) {
  console.error('Não foi possível conectar:', error)
}

// Exporta a instância para ser usada em outros arquivos
module.exports = sequelize
