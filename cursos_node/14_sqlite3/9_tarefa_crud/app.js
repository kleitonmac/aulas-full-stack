// ============================================================
// TAREFA PRÁTICA: SISTEMA DE GERENCIAMENTO DE TAREFAS
// ============================================================
// Criar um sistema CRUD completo de tarefas com SQLite3
// Operações: Create Read Update Delete

const sqlite3 = require('sqlite3').verbose()
const readline = require('readline')

// Conectar ao banco de dados
const db = new sqlite3.Database('./tarefas.db', (err) => {
  if (err) console.error('Erro:', err.message)
  else console.log('✓ Conectado ao banco de tarefas')
})

// Criar tabela de tarefas
db.run(`CREATE TABLE IF NOT EXISTS tarefas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  titulo TEXT NOT NULL,
  descricao TEXT,
  concluida BOOLEAN DEFAULT 0,
  data_criacao DATETIME DEFAULT CURRENT_TIMESTAMP,
  data_conclusao DATETIME
)`)

// Interface de linha de comando
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// ============================================================
// FUNÇÕES CRUD
// ============================================================

// CREATE - Adicionar tarefa
function adicionarTarefa(titulo, descricao) {
  db.run(
    `INSERT INTO tarefas (titulo, descricao) VALUES (?, ?)`,
    [titulo, descricao],
    function (err) {
      if (err) {
        console.error('✗ Erro ao adicionar tarefa')
      } else {
        console.log(`✓ Tarefa adicionada (ID: ${this.lastID})`)
      }
      mostrarMenu()
    },
  )
}

// READ - Listar tarefas
function listarTarefas(filtro = null) {
  let query = 'SELECT * FROM tarefas'
  let params = []

  if (filtro === 'pendentes') {
    query += ' WHERE concluida = 0'
  } else if (filtro === 'concluidas') {
    query += ' WHERE concluida = 1'
  }

  query += ' ORDER BY concluida ASC, data_criacao DESC'

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('✗ Erro ao listar tarefas')
    } else if (rows.length === 0) {
      console.log('\n(Nenhuma tarefa encontrada)')
    } else {
      console.log('\n--- TAREFAS ---')
      rows.forEach((tarefa) => {
        const status = tarefa.concluida ? '✓' : '○'
        console.log(`${status} #${tarefa.id}: ${tarefa.titulo}`)
        if (tarefa.descricao) {
          console.log(`   ${tarefa.descricao}`)
        }
      })
    }
    console.log('')
    mostrarMenu()
  })
}

// UPDATE - Marcar como concluída
function concluirTarefa(id) {
  db.run(
    `UPDATE tarefas SET concluida = 1, data_conclusao = CURRENT_TIMESTAMP 
     WHERE id = ?`,
    [id],
    function (err) {
      if (err) {
        console.error('✗ Erro ao concluir tarefa')
      } else if (this.changes === 0) {
        console.log('✗ Tarefa não encontrada')
      } else {
        console.log('✓ Tarefa concluída!')
      }
      mostrarMenu()
    },
  )
}

// DELETE - Remover tarefa
function deletarTarefa(id) {
  db.run(`DELETE FROM tarefas WHERE id = ?`, [id], function (err) {
    if (err) {
      console.error('✗ Erro ao deletar tarefa')
    } else if (this.changes === 0) {
      console.log('✗ Tarefa não encontrada')
    } else {
      console.log('✓ Tarefa removida!')
    }
    mostrarMenu()
  })
}

// ============================================================
// MENU PRINCIPAL
// ============================================================

function mostrarMenu() {
  console.log('\n=== GERENCIADOR DE TAREFAS ===')
  console.log('1. Adicionar tarefa')
  console.log('2. Listar todas as tarefas')
  console.log('3. Listar tarefas pendentes')
  console.log('4. Listar tarefas concluídas')
  console.log('5. Marcar tarefa como concluída')
  console.log('6. Remover tarefa')
  console.log('7. Sair\n')

  rl.question('Escolha uma opção (1-7): ', (opcao) => {
    switch (opcao) {
      case '1':
        rl.question('Título da tarefa: ', (titulo) => {
          rl.question('Descrição (opcional): ', (descricao) => {
            adicionarTarefa(titulo, descricao)
          })
        })
        break
      case '2':
        listarTarefas()
        break
      case '3':
        listarTarefas('pendentes')
        break
      case '4':
        listarTarefas('concluidas')
        break
      case '5':
        rl.question('ID da tarefa para concluir: ', (id) => {
          concluirTarefa(id)
        })
        break
      case '6':
        rl.question('ID da tarefa para remover: ', (id) => {
          deletarTarefa(id)
        })
        break
      case '7':
        console.log('✓ Até logo!')
        db.close()
        rl.close()
        process.exit(0)
        break
      default:
        console.log('✗ Opção inválida')
        mostrarMenu()
    }
  })
}

// Iniciar aplicação
console.log('\n🚀 Bem-vindo ao Gerenciador de Tarefas!\n')
mostrarMenu()
