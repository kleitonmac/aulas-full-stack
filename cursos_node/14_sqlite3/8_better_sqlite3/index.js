// ============================================================
// SQLite3 - USANDO BETTER-SQLITE3 (Síncrono e mais rápido)
// ============================================================
// better-sqlite3 é mais rápido e permite escrita síncrona
// Instalação: npm install better-sqlite3

const Database = require('better-sqlite3')

// Conectar ao banco de dados
// ':memory:' cria um banco em memória (temporário)
// './banco.db' cria/conecta a um arquivo
const db = new Database('./banco_better.db')

console.log('\n--- BETTER-SQLITE3 (Síncrono) ---\n')

// ============ CRIAR TABELA (não precisa de callback!) ============
console.log('1. Criando tabelas:')

db.exec(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    preco REAL NOT NULL
  );
`)

console.log('✓ Tabelas criadas')

// ============ INSERIR DADOS (Síncrono!) ============
console.log('\n2. Inserindo usuários:')

// Preparar um statement
const insertUser = db.prepare(
  'INSERT INTO usuarios (nome, email) VALUES (?, ?)',
)

// Inserir múltiplos registros
const usuarios = [
  ['João', 'joao@email.com'],
  ['Maria', 'maria@email.com'],
  ['Pedro', 'pedro@email.com'],
]

usuarios.forEach((user) => {
  const result = insertUser.run(user)
  console.log(`✓ Usuário inserido (ID: ${result.lastInsertRowid})`)
})

// ============ LER DADOS (Síncrono de verdade!) ============
console.log('\n3. Lendo dados:')

const selectAll = db.prepare('SELECT * FROM usuarios')
const rows = selectAll.all()

console.log(`Total de usuários: ${rows.length}`)
rows.forEach((row) => {
  console.log(`  - ${row.nome}: ${row.email}`)
})

// ============ USAR TRANSAÇÕES ============
console.log('\n4. Usando transações (tudo ou nada):')

// Preparar statements
const insertProd = db.prepare(
  'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
)

try {
  // Iniciar transação
  const transaction = db.transaction((prods) => {
    prods.forEach((prod) => {
      insertProd.run(prod)
    })
  })

  // Executar transação
  transaction([
    ['Notebook', 2500],
    ['Mouse', 50],
    ['Teclado', 150],
  ])

  console.log('✓ Transação concluída com sucesso')
} catch (err) {
  console.error('✗ Erro na transação:', err.message)
}

// ============ VERIFICAR DADOS ============
console.log('\n5. Produtos inseridos:')

const selectProds = db.prepare('SELECT * FROM produtos')
const prods = selectProds.all()

prods.forEach((prod) => {
  console.log(`  - ${prod.nome}: R$${prod.preco}`)
})

// ============ ATUALIZAR (Síncrono) ============
console.log('\n6. Atualizando preço:')

const updateProd = db.prepare('UPDATE produtos SET preco = ? WHERE id = ?')

const result = updateProd.run(3000, 1)
console.log(`✓ ${result.changes} produto(s) atualizado(s)`)

// ============ DELETAR (Síncrono) ============
console.log('\n7. Deletando registros:')

const deleteProd = db.prepare('DELETE FROM produtos WHERE preco < ?')
const deleteResult = deleteProd.run(100)

console.log(`✓ ${deleteResult.changes} produto(s) deletado(s)`)

// ============ FECHAR ============
console.log('\n✓ Banco de dados fechado')
db.close()
