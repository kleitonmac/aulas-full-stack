// ============================================================
// SQLite3 - INSTALAÇÃO E CONFIGURAÇÃO BÁSICA
// ============================================================
// SQLite3 é um banco de dados SQL leve e embutido
// Não requer um servidor separado, os dados são armazenados em arquivo
// Instalação: npm install sqlite3

// Importar o módulo sqlite3
const sqlite3 = require('sqlite3').verbose()

// Criar ou conectar a um banco de dados SQLite3
// Se o arquivo 'banco.db' não existe, será criado automaticamente
const db = new sqlite3.Database('./banco.db', (err) => {
  if (err) {
    // Se houver erro na conexão, exibir mensagem de erro
    console.error('Erro ao conectar ao banco:', err.message)
  } else {
    // Se bem-sucedido, exibir mensagem de confirmação
    console.log('Conectado ao SQLite3 com sucesso!')
  }
})

// db.serialize() executa os comandos SQL em sequência
// Garante que um comando termina antes do próximo começar
db.serialize(() => {
  // Criar uma tabela de usuários (se não existir)
  // CREATE TABLE IF NOT EXISTS evita erro se a tabela já existe
  db.run(
    `CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    idade INTEGER
  )`,
    (err) => {
      if (err) {
        console.error('Erro ao criar tabela:', err.message)
      } else {
        console.log('Tabela de usuários criada/verificada com sucesso!')
      }
    },
  )
})

// Fechar a conexão com o banco de dados
// Importante fazer isso ao fim do programa
db.close((err) => {
  if (err) {
    console.error('Erro ao fechar conexão:', err.message)
  } else {
    console.log('Conexão fechada com sucesso!')
  }
})
