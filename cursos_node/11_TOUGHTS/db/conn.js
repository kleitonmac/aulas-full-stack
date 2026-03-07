/**
 * CONEXÃO COM O BANCO DE DADOS
 * =============================
 * Este arquivo configura a conexão com MySQL usando Sequelize ORM
 * Sequelize é um objeto que mapeia as operações JavaScript para SQL
 */

const { Sequelize } = require('sequelize')

// Cria uma nova instância de Sequelize com as credenciais do banco de dados
const sequelize = new Sequelize(
  'toughts', // Nome do banco de dados
  'root', // Usuário do MySQL
  '', // Senha (vazio neste caso)
  {
    host: 'localhost', // Servidor onde o MySQL está rodando
    dialect: 'mysql', // Tipo de banco de dados
  },
)

// Testa se a conexão está funcionando
try {
  sequelize.authenticate()
  console.log('\x1b[32m✓ Conectados ao banco de dados com Sequelize!\x1b[0m')
} catch (error) {
  console.error('\x1b[31m✗ Não foi possível conectar:', error, '\x1b[0m')
}

module.exports = sequelize
