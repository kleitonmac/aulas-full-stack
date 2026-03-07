// ========================================
// CONEXÃO COM BANCO DE DADOS USANDO SEQUELIZE
// ========================================
// Este arquivo configura a conexão do Sequelize com um banco de dados MySQL.
// O Sequelize é um ORM (Object-Relational Mapping) que permite trabalhar com banco de dados de forma orientada a objetos.

const { Sequelize } = require('sequelize')

// Cria uma instância do Sequelize com parâmetros de conexão:
// - Primeiro parâmetro: nome do banco de dados ('nodesequelize')
// - Segundo parâmetro: usuário ('root')
// - Terceiro parâmetro: senha (vazio '')
// - Quarto parâmetro: opções de configuração (host, dialect)
const sequelize = new Sequelize('nodesequelize', 'root', '', {
  host: 'localhost', // Servidor do banco (localhost = máquina local)
  dialect: 'mysql', // Tipo de banco de dados (MySQL)
})

// Bloco try-catch para verificar se a conexão foi bem-sucedida
// try: tenta executar o código
// catch: captura e trata erros
try {
  sequelize.authenticate()
  console.log('Conectamos com o Sequelize!')
} catch (error) {
  console.error('Não foi possível conectar:', error)
}

// Exporta a instância do Sequelize para ser usada em outros arquivos
module.exports = sequelize
