// ============================================================
// SQLite3 - INSERINDO DADOS (INSERT INTO)
// ============================================================

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./banco.db')

db.serialize(() => {
  // ============ INSERÇÃO BÁSICA ============
  // INSERT INTO adiciona novos registros na tabela
  console.log('\n--- INSERINDO USUÁRIOS ---')

  db.run(
    `INSERT INTO usuarios (nome, email, senha) 
          VALUES (?, ?, ?)`,
    ['João Silva', 'joao@email.com', 'senha123'],
    function (err) {
      if (err) {
        console.error('Erro ao inserir:', err.message)
      } else {
        // this.lastID retorna o ID do último registro inserido
        console.log(`✓ Usuário inserido com ID: ${this.lastID}`)
      }
    },
  )

  // ============ MÚLTIPLAS INSERÇÕES ============
  console.log('\nInserindo mais usuários...')

  const usuarios = [
    ['Maria Santos', 'maria@email.com', 'senha456'],
    ['Pedro Oliveira', 'pedro@email.com', 'senha789'],
    ['Ana Costa', 'ana@email.com', 'senha000'],
  ]

  // Preparar um statement para inserção rápida
  const stmt = db.prepare(`INSERT INTO usuarios (nome, email, senha) 
                           VALUES (?, ?, ?)`)

  // Executar para cada usuário
  usuarios.forEach((usuario) => {
    stmt.run(usuario, function (err) {
      if (!err) {
        console.log(`✓ Usuário ${usuario[0]} inserido (ID: ${this.lastID})`)
      }
    })
  })

  // Finalizar o statement
  stmt.finalize()

  // ============ INSERINDO POSTS ============
  console.log('\n--- INSERINDO POSTS ---')

  setTimeout(() => {
    db.run(
      `INSERT INTO posts (titulo, conteudo, usuario_id) 
            VALUES (?, ?, ?)`,
      ['Meu Primeiro Post', 'Conteúdo do post 1', 1],
      function (err) {
        if (!err) {
          console.log(`✓ Post inserido com ID: ${this.lastID}`)
        }
      },
    )
  }, 1000)
})

// Fechar após um tempo
setTimeout(() => {
  db.close(() => console.log('\n✓ Conexão fechada'))
}, 2000)
