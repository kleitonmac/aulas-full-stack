// ============================================================
// SQLite3 - CRIANDO TABELAS COM DIFERENTES TIPOS DE DADOS
// ============================================================

const sqlite3 = require('sqlite3').verbose()

// Conectar ao banco de dados
const db = new sqlite3.Database('./banco.db', (err) => {
  if (err) console.error('Erro de conexão:', err.message)
  else console.log('Conectado ao banco de dados')
})

// Executar múltiplos comandos em sequência
db.serialize(() => {
  // ============ TABELA 1: USUÁRIOS ============
  db.run(
    `CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
    (err) => {
      if (!err) console.log('✓ Tabela USUÁRIOS criada')
    },
  )

  // ============ TABELA 2: POSTS/ARTIGOS ============
  db.run(
    `CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    conteudo TEXT,
    usuario_id INTEGER NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN DEFAULT 1,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )`,
    (err) => {
      if (!err) console.log('✓ Tabela POSTS criada')
    },
  )

  // ============ TABELA 3: COMENTÁRIOS ============
  db.run(
    `CREATE TABLE IF NOT EXISTS comentarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    texto TEXT NOT NULL,
    post_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES posts(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
  )`,
    (err) => {
      if (!err) console.log('✓ Tabela COMENTÁRIOS criada')
    },
  )

  // ============ TABELA 4: PRODUTOS ============
  db.run(
    `CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    estoque INTEGER DEFAULT 0,
    data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP
  )`,
    (err) => {
      if (!err) console.log('✓ Tabela PRODUTOS criada')
    },
  )
})

// Fechar a conexão
db.close()
