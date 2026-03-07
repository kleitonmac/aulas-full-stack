// ============================================================
// SQLite3 - ATUALIZANDO DADOS (UPDATE)
// ============================================================

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./banco.db')

console.log('\n--- ATUALIZANDO DADOS ---\n')

// ============ UPDATE SIMPLES ============
console.log('1. Atualizando email do usuário ID 1:')

db.run(
  `UPDATE usuarios SET email = ? WHERE id = ?`,
  ['joao.novo@email.com', 1],
  function (err) {
    if (err) {
      console.error('Erro:', err.message)
    } else {
      // this.changes retorna quantos registros foram modificados
      console.log(`✓ ${this.changes} registro(s) atualizado(s)`)
    }
  },
)

// ============ UPDATE MÚLTIPLOS CAMPOS ============
console.log('\n2. Atualizando nome e email do usuário ID 2:')

db.run(
  `UPDATE usuarios 
   SET nome = ?, email = ? 
   WHERE id = ?`,
  ['Maria Nova Silva', 'maria.nova@email.com', 2],
  function (err) {
    if (err) {
      console.error('Erro:', err.message)
    } else {
      console.log(`✓ ${this.changes} registro(s) atualizado(s)`)
    }
  },
)

// ============ UPDATE CONDICIONAL ============
console.log('\n3. Marcando posts como inativos:')

db.run(`UPDATE posts SET ativo = 0 WHERE usuario_id < ?`, [2], function (err) {
  if (err) {
    console.error('Erro:', err.message)
  } else {
    console.log(`✓ ${this.changes} post(s) marcado(s) como inativo(s)`)
  }
})

// ============ UPDATE COM INCREMENTO ============
console.log('\n4. Aumentando preço dos produtos em 10%:')

db.run(`UPDATE produtos SET preco = preco * 1.10`, function (err) {
  if (err) {
    console.error('Erro:', err.message)
  } else {
    console.log(`✓ ${this.changes} produto(s) atualizado(s)`)
  }
})

// ============ VERIFICANDO ATUALIZAÇÕES ============
console.log('\n5. Verificando dados atualizados:')

setTimeout(() => {
  db.all(`SELECT id, nome, email FROM usuarios WHERE id <= 2`, (err, rows) => {
    if (!err && rows) {
      console.log('Usuários atualizados:')
      rows.forEach((row) => {
        console.log(`  - ID ${row.id}: ${row.nome} (${row.email})`)
      })
    }
  })
}, 500)

// Fechar após um tempo
setTimeout(() => {
  db.close(() => console.log('\n✓ Conexão fechada'))
}, 1500)
