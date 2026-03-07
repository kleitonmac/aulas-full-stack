// ============================================================
// SQLite3 - QUERIES AVANÇADAS (JOINs, AGREGAÇÕES, GROUP BY)
// ============================================================

const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./banco.db')

console.log('\n--- QUERIES AVANÇADAS ---\n')

// ============ INNER JOIN ============
console.log('1. Posts com nomes dos usuários (INNER JOIN):')

db.all(
  `SELECT p.id, p.titulo, u.nome as autor 
   FROM posts p
   INNER JOIN usuarios u ON p.usuario_id = u.id`,
  (err, rows) => {
    if (!err && rows) {
      rows.forEach((row) => {
        console.log(`  - "${row.titulo}" por ${row.autor}`)
      })
    }
  },
)

// ============ LEFT JOIN ============
console.log('\n2. Usuários e seus posts (LEFT JOIN):')

db.all(
  `SELECT u.nome, COUNT(p.id) as total_posts
   FROM usuarios u
   LEFT JOIN posts p ON u.id = p.usuario_id
   GROUP BY u.id`,
  (err, rows) => {
    if (!err && rows) {
      rows.forEach((row) => {
        console.log(`  - ${row.nome}: ${row.total_posts} post(s)`)
      })
    }
  },
)

// ============ AGREGAÇÃO (COUNT, SUM, AVG) ============
console.log('\n3. Estatísticas de produtos:')

db.all(
  `SELECT 
     COUNT(*) as total_produtos,
     SUM(preco) as preco_total,
     AVG(preco) as preco_medio,
     MAX(preco) as preco_maximo,
     MIN(preco) as preco_minimo
   FROM produtos`,
  (err, rows) => {
    if (!err && rows && rows[0]) {
      const r = rows[0]
      console.log(`  - Total de produtos: ${r.total_produtos}`)
      console.log(`  - Preço total: R$${r.preco_total}`)
      console.log(`  - Preço médio: R$${r.preco_medio}`)
      console.log(`  - Preço máximo: R$${r.preco_maximo}`)
      console.log(`  - Preço mínimo: R$${r.preco_minimo}`)
    }
  },
)

// ============ GROUP BY ============
console.log('\n4. Comentários por post:')

db.all(
  `SELECT p.titulo, COUNT(c.id) as total_comentarios
   FROM posts p
   LEFT JOIN comentarios c ON p.id = c.post_id
   GROUP BY p.id
   ORDER BY total_comentarios DESC`,
  (err, rows) => {
    if (!err && rows) {
      rows.forEach((row) => {
        console.log(
          `  - "${row.titulo}": ${row.total_comentarios} comentário(s)`,
        )
      })
    }
  },
)

// ============ HAVING (filtrar grupos) ============
console.log('\n5. Usuários com mais de 1 post:')

db.all(
  `SELECT u.nome, COUNT(p.id) as total_posts
   FROM usuarios u
   LEFT JOIN posts p ON u.id = p.usuario_id
   GROUP BY u.id
   HAVING COUNT(p.id) > 1`,
  (err, rows) => {
    if (!err && rows) {
      if (rows.length === 0) {
        console.log('  (nenhum usuário tem mais de 1 post)')
      } else {
        rows.forEach((row) => {
          console.log(`  - ${row.nome}: ${row.total_posts} posts`)
        })
      }
    }
  },
)

// ============ UNION (combinar resultados) ============
console.log('\n6. Nomes de usuários e títulos de posts combinados:')

db.all(
  `SELECT nome as item FROM usuarios
   UNION
   SELECT titulo as item FROM posts`,
  (err, rows) => {
    if (!err && rows) {
      rows.forEach((row) => {
        console.log(`  - ${row.item}`)
      })
    }
  },
)

// ============ SUBQUERY ============
console.log('\n7. Posts do usuário mais ativo:')

db.all(
  `SELECT titulo, usuario_id
   FROM posts
   WHERE usuario_id = (
     SELECT usuario_id
     FROM posts
     GROUP BY usuario_id
     ORDER BY COUNT(*) DESC
     LIMIT 1
   )`,
  (err, rows) => {
    if (!err && rows) {
      rows.forEach((row) => {
        console.log(`  - "${row.titulo}"`)
      })
    }
  },
)

// Fechar após um tempo
setTimeout(() => {
  db.close(() => console.log('\n✓ Conexão fechada'))
}, 2000)
