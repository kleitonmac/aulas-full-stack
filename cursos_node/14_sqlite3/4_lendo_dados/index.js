// ============================================================
// SQLite3 - LENDO DADOS (SELECT)
// ============================================================

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./banco.db')

console.log('\n--- LENDO DADOS DO BANCO ---\n')

// ============ SELECT TUDO ============
console.log('1. Todos os usuários:')

db.all(`SELECT * FROM usuarios`, (err, rows) => {
  // db.all() retorna TODOS os registros em um array
  if (err) {
    console.error('Erro:', err.message)
  } else if (rows.length === 0) {
    console.log('Nenhum usuário encontrado')
  } else {
    rows.forEach((row) => {
      console.log(`  - ID: ${row.id}, Nome: ${row.nome}, Email: ${row.email}`)
    })
  }
})

// ============ SELECT COM CONDIÇÃO (WHERE) ============
console.log('\n2. Usuário com ID específico:')

db.get(`SELECT * FROM usuarios WHERE id = ?`, [1], (err, row) => {
  // db.get() retorna apenas UM registro
  if (err) {
    console.error('Erro:', err.message)
  } else if (!row) {
    console.log('Usuário não encontrado')
  } else {
    console.log(`  Nome: ${row.nome}\n  Email: ${row.email}`)
  }
})

// ============ SELECT COM FILTRO ============
console.log('\n3. Usuários com email contendo "email":')

db.all(
  `SELECT id, nome, email FROM usuarios WHERE email LIKE ?`,
  ['%email%'],
  (err, rows) => {
    if (err) {
      console.error('Erro:', err.message)
    } else {
      console.log(`Encontrados ${rows.length} usuários`)
      rows.forEach((row) => {
        console.log(`  - ${row.nome}: ${row.email}`)
      })
    }
  },
)

// ============ CONTAR REGISTROS ============
console.log('\n4. Total de usuários:')

db.get(`SELECT COUNT(*) as total FROM usuarios`, (err, row) => {
  if (!err) {
    console.log(`  Total: ${row.total} usuários`)
  }
})

// ============ ORDENAR RESULTADOS ============
console.log('\n5. Usuários ordenados por nome:')

db.all(`SELECT * FROM usuarios ORDER BY nome ASC`, (err, rows) => {
  if (!err && rows) {
    rows.forEach((row) => {
      console.log(`  - ${row.nome}`)
    })
  }
})

// ============ LIMITAR RESULTADOS ============
console.log('\n6. Primeiros 2 usuários:')

db.all(`SELECT * FROM usuarios LIMIT 2`, (err, rows) => {
  if (!err && rows) {
    rows.forEach((row) => {
      console.log(`  - ${row.nome}`)
    })
  }
})

// Fechar após um tempo
setTimeout(() => {
  db.close(() => console.log('\n✓ Conexão fechada'))
}, 2000)
