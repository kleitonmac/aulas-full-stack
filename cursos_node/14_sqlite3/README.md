# 📚 Curso SQLite3 com Node.js

Um curso progressivo sobre como usar **SQLite3** (banco de dados relacional leve) com Node.js.

## 📖 Conteúdo do Curso

### 1️⃣ **1_instalacao** - Instalação e Configuração Básica

- Instalar o módulo `sqlite3`
- Conectar a um banco de dados
- Criar primeira tabela
- **Conceitos**: conexão, serialize(), create table

```bash
node index.js
```

### 2️⃣ **2_criando_tabela** - Criando Tabelas com Diferentes Tipos

- Tipos de dados SQL (TEXT, INTEGER, REAL, BOOLEAN, DATETIME)
- PRIMARY KEY e AUTOINCREMENT
- UNIQUE e NOT NULL
- Foreign Keys (relacionamentos)

```bash
node index.js
```

### 3️⃣ **3_inserindo_dados** - Inserindo Dados (INSERT)

- INSERT basic syntax
- Parâmetros (?) para evitar SQL injection
- Múltiplas inserções
- Obter ID do último registro inserido

```bash
node index.js
```

### 4️⃣ **4_lendo_dados** - Lendo Dados (SELECT)

- `db.all()` - retorna todos os registros
- `db.get()` - retorna um registro
- `db.each()` - iterar sobre resultado
- WHERE, ORDER BY, LIMIT
- Filtros e busca

```bash
node index.js
```

### 5️⃣ **5_atualizando_dados** - Atualizando Dados (UPDATE)

- UPDATE básico
- Atualizar múltiplos campos
- Atualizar com condições
- Incrementar valores
- Verificar quantidade de registros modificados

```bash
node index.js
```

### 6️⃣ **6_deletando_dados** - Deletando Dados (DELETE)

- DELETE com WHERE
- Deletar múltiplos registros
- Deletar com múltiplas condições
- DELETE com datas
- CUIDADO: revisar condições antes de deletar!

```bash
node index.js
```

### 7️⃣ **7_queries_avancadas** - JOINs, Agregações e GROUP BY

- INNER JOIN - juntar tabelas
- LEFT JOIN - tabelas com valores nulos
- COUNT, SUM, AVG, MAX, MIN
- GROUP BY e HAVING
- UNION - combinar resultados
- SUBQUERIES

```bash
node index.js
```

### 8️⃣ **8_better_sqlite3** - Usando better-sqlite3 (Mais Rápido)

- Instalação do `better-sqlite3`
- Operações **síncronas** (sem callbacks)
- Transações
- Melhor performance
- Código mais limpo

```bash
npm install better-sqlite3
node index.js
```

### 9️⃣ **9_tarefa_crud** - Projeto Prático: Gerenciador de Tarefas

- Sistema CRUD completo (Create, Read, Update, Delete)
- Interface interativa com readline
- Menu de opções
- Filtrar tarefas
- Marcar como concluída
- Remover tarefas

```bash
node app.js
```

## 🔧 Instalação

### Pré-requisitos

- Node.js instalado
- npm

### Dependências Necessárias

```bash
# Instalar sqlite3
npm install sqlite3

# Ou instalar melhor-sqlite3 (mais rápido, síncrono)
npm install better-sqlite3

# Para a tarefa prática (readline já vem com Node.js)
```

### Arquivo package.json

```json
{
  "name": "curso-sqlite3",
  "version": "1.0.0",
  "description": "Curso de SQLite3 com Node.js",
  "main": "index.js",
  "scripts": {
    "install-1": "node 1_instalacao/index.js",
    "create-2": "node 2_criando_tabela/index.js",
    "insert-3": "node 3_inserindo_dados/index.js",
    "read-4": "node 4_lendo_dados/index.js",
    "update-5": "node 5_atualizando_dados/index.js",
    "delete-6": "node 6_deletando_dados/index.js",
    "advanced-7": "node 7_queries_avancadas/index.js",
    "better-8": "node 8_better_sqlite3/index.js",
    "tarefa-9": "node 9_tarefa_crud/app.js"
  },
  "keywords": ["sqlite3", "database", "node.js"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "sqlite3": "^5.1.6"
  },
  "devDependencies": {
    "better-sqlite3": "^9.0.0"
  }
}
```

## 📝 Exemplo Rápido

```javascript
const sqlite3 = require('sqlite3').verbose()

// Conectar
const db = new sqlite3.Database('./banco.db')

// Inserir
db.run('INSERT INTO usuarios (nome) VALUES (?)', ['João'])

// Ler
db.all('SELECT * FROM usuarios', (err, rows) => {
  console.log(rows)
})

// Fechar
db.close()
```

## 💡 Dicas Importantes

### 1. Sempre use parâmetros (?)

❌ **ERRADO** - Vulnerável a SQL injection

```javascript
db.run(`INSERT INTO usuarios (nome) VALUES ('${nome}')`)
```

✅ **CERTO** - Seguro

```javascript
db.run(`INSERT INTO usuarios (nome) VALUES (?)`, [nome])
```

### 2. Use db.serialize() para executar em ordem

```javascript
db.serialize(() => {
  db.run('CREATE TABLE ...')
  db.run('INSERT INTO ...')
  db.run('SELECT ...')
})
```

### 3. Feche sempre a conexão

```javascript
db.close(() => {
  console.log('Conexão fechada')
})
```

### 4. Trate erros adequadamente

```javascript
db.run('SELECT * FROM usuarios', (err, row) => {
  if (err) {
    console.error('Erro:', err.message)
  } else {
    console.log(row)
  }
})
```

## 🎯 Comparativo: sqlite3 vs better-sqlite3

| Aspecto    | sqlite3                | better-sqlite3        |
| ---------- | ---------------------- | --------------------- |
| Velocidade | Normal                 | Muito mais rápido     |
| Operações  | Assíncronas            | Síncronas             |
| Callbacks  | Sim                    | Não                   |
| Transações | Suportadas             | Mais fácil            |
| Instalação | npm install            | Precisa compilar      |
| Uso        | `db.run()`, `db.all()` | Statements preparados |

## 📚 Recursos Adicionais

- [Documentação SQLite](https://www.sqlite.org/docs.html)
- [Documentação sqlite3 npm](https://github.com/mapbox/node-sqlite3)
- [Documentação better-sqlite3](https://github.com/WiseLibs/better-sqlite3)

## ✅ Próximos Passos

1. Execute os exemplos na ordem (1 a 9)
2. Modifique os códigos para experimentar
3. Crie suas próprias aplicações
4. Combine com Express.js para criar APIs REST
5. Estude relacionamentos entre tabelas

---

**Bom estudo! 🚀**
