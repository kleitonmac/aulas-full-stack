/**
 * APLICAÇÃO TOUGHTS - Sistema de Pensamentos com Autenticação
 * ============================================================
 * Este é o arquivo principal que configura:
 * - Framework Express.js para criar o servidor web
 * - Motor de templates Handlebars para renderizar views
 * - Sistema de sessões com armazenamento em arquivo
 * - Sistema de mensagens flash para feedback ao usuário
 */

const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

const app = express()

// Importa a conexão com o banco de dados (Sequelize + MySQL)
const conn = require('./db/conn')

// Importa o modelo de dados (Tought representa um pensamento)
const Tought = require('./models/Tought')

// Importa as rotas da aplicação
const toughtsRoutes = require('./routes/toughtsRoutes') // Rotas para gerenciar pensamentos
const authRoutes = require('./routes/authRoutes') // Rotas para autenticação (login/registro)
const ToughController = require('./controllers/ToughtController')

// Configuração do motor de templates Handlebars
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

// Middleware: processa dados de formulários (POST)
app.use(
  express.urlencoded({
    extended: true,
  }),
)

// Middleware: processa dados JSON enviados na requisição
app.use(express.json())

// Middleware de Sessão: mantém o usuário logado durante a navegação
// Armazena informações da sessão em arquivos temporários do sistema
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret', // Chave secreta para criptografar a sessão
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'), // Pasta de armazenamento
    }),
    cookie: {
      secure: false,
      maxAge: 3600000, // Tempo de expiração: 1 hora
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)

// Middleware de Flash Messages: exibe mensagens de feedback temporárias
app.use(flash())

// Middleware: serve arquivos estáticos (CSS, imagens, JavaScript)
app.use(express.static('public'))

// Middleware customizado: disponibiliza informações da sessão nas views
// Se o usuário estiver logado (userid existe), passa os dados para o template
app.use((req, res, next) => {
  console.log(req.session.userid)

  // Se há um usuário logado, disponibiliza a sessão nas views
  if (req.session.userid) {
    res.locals.session = req.session
  }

  next()
})

// Define as rotas da aplicação
app.use('/toughts', toughtsRoutes) // Rotas de pensamentos em /toughts
app.use('/', authRoutes) // Rotas de autenticação em /

app.get('/', ToughtController.showToughts) // Página inicial mostra todos os pensamentos

// Sincroniza os modelos com o banco de dados (cria tabelas se necessário)
// e inicia o servidor na porta 3000
conn
  .sync()
  .then(() => {
    app.listen(3000)
    console.log('\x1b[32m✓ Servidor rodando em http://localhost:3000\x1b[0m')
  })
  .catch((err) => console.log(err))
