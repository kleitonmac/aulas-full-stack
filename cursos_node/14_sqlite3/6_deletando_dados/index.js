// ============================================================
// SQLite3 - DELETANDO DADOS (DELETE)
// ============================================================

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./banco.db')

console.log('\n--- DELETANDO DADOS ---\n')

// ============ DELETE COM CONDIÇÃO ============
console.log('1. Deletando usuário com ID 5:')

db.run(`DELETE FROM usuarios WHERE id = ?`, [5], function (err) {
  if (err) {
    console.error('Erro:', err.message)
  } else {
    // this.changes retorna quantos registros foram deletados
    console.log(`✓ ${this.changes} registro(s) deletado(s)`)
  }
})

// ============ DELETE MÚLTIPLOS REGISTROS ============
console.log('\n2. Deletando posts inativos (ativo = 0):')

db.run(`DELETE FROM posts WHERE ativo = 0`, function (err) {
  if (err) {
    console.error('Erro:', err.message)
  } else {
    console.log(`✓ ${this.changes} post(s) deletado(s)`)
  }
})

// ============ DELETE COM MÚLTIPLAS CONDIÇÕES ============
console.log('\n3. Deletando comentários antigos (mais de 30 dias):')

db.run(
  `DELETE FROM comentarios 
   WHERE data_criacao < datetime('now', '-30 days')`,
  function (err) {
    if (err) {
      console.error('Erro:', err.message)
    } else {
      console.log(`✓ ${this.changes} comentário(s) deletado(s)`)
    }
  },
)

// ============ DELETAR TUDO (COM CUIDADO!) ============
console.log('\n4. Limpando produtos com estoque zerado:')

db.run(`DELETE FROM produtos WHERE estoque = 0`, function (err) {
  if (err) {
    console.error('Erro:', err.message)
  } else {
    console.log(`✓ ${this.changes} produto(s) deletado(s)`)
  }
})

// ============ VERIFICAR DADOS APÓS DELEÇÃO ============
console.log('\n5. Contagem de registros após deleção:')

setTimeout(() => {
  db.all(`SELECT COUNT(*) as total FROM usuarios`, (err, rows) => {
    if (!err) {
      console.log(`  - Usuários: ${rows[0].total}`)
    }
  })

  db.all(`SELECT COUNT(*) as total FROM posts`, (err, rows) => {
    if (!err) {
      console.log(`  - Posts: ${rows[0].total}`)
    }
  })

  db.all(`SELECT COUNT(*) as total FROM comentarios`, (err, rows) => {
    if (!err) {
      console.log(`  - Comentários: ${rows[0].total}`)
    }
  })
}, 500)

// Fechar após um tempo
setTimeout(() => {
  db.close(() => console.log('\n✓ Conexão fechada'))
}, 1500)
