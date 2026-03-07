/**
 * AUTENTICAÇÃO COM JWT (JSON Web Token)
 * =========================================
 * Implementa autenticação segura usando JWT
 * Tokens JWT permitem que o cliente se mantenha autenticado sem sessão no servidor
 * Usa bcrypt para criptografar senhas e JWT para gerar tokens seguros
 */

// Carrega variáveis de ambiente do arquivo .env
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose') // Para conectar ao MongoDB
const bcrypt = require('bcrypt') // Para criptografar senhas
const jwt = require('jsonwebtoken') // Para trabalhar com JWT tokens

const app = express()

// Importa o modelo User
const User = require('./models/User')

// Configura o Express para processar JSON
app.use(express.json())

// ===== ENDPOINTS DA API =====

// Rota pública - Não requer autenticação
app.get('/', (req, res) => {
  res.status(200).json({ msg: 'Bem vindo a API!' })
})

// Rota privada - Requer autenticação (token JWT)
app.get('/user/:id', checkToken, async (req, res) => {
  const id = req.params.id

  // Verifica se o usuário existe (sem exibir a senha: "-password")
  const user = await User.findById(id, '-password')

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' })
  }

  res.status(200).json({ user })
})

/**
 * MIDDLEWARE: Verifica se o cliente enviou um JWT token válido
 * Este middleware é usado em rotas protegidas
 */
function checkToken(req, res, next) {
  // Extrai o token do header Authorization
  const authHeader = req.headers['authorization']
  // O formato é: "Bearer <token", então separamos e pegamos t token
  const token = authHeader && authHeader.split(' ')[1]

  // Se não houver token, nega acesso
  if (!token) return res.status(401).json({ msg: 'Acesso negado!' })

  try {
    // Valida o token usando a chave secreta guardada em .env
    const secret = process.env.SECRET

    jwt.verify(token, secret)

    // Se o token for válido, continua para a próxima função
    next()
  } catch (err) {
    // Se o token for inválido, retorna erro 400
    res.status(400).json({ msg: 'O Token é inválido!' })
  }
}

app.post('/auth/register', async (req, res) => {
  const { name, email, password, confirmpassword } = req.body

  // validations
  if (!name) {
    return res.status(422).json({ msg: 'O nome é obrigatório!' })
  }

  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' })
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' })
  }

  if (password != confirmpassword) {
    return res
      .status(422)
      .json({ msg: 'A senha e a confirmação precisam ser iguais!' })
  }

  // check if user exists
  const userExists = await User.findOne({ email: email })

  if (userExists) {
    return res.status(422).json({ msg: 'Por favor, utilize outro e-mail!' })
  }

  // create password
  const salt = await bcrypt.genSalt(12)
  const passwordHash = await bcrypt.hash(password, salt)

  // create user
  const user = new User({
    name,
    email,
    passwordHash,
  })

  try {
    await user.save()

    res.status(201).json({ msg: 'Usuário criado com sucesso!' })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})

app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body

  // validations
  if (!email) {
    return res.status(422).json({ msg: 'O email é obrigatório!' })
  }

  if (!password) {
    return res.status(422).json({ msg: 'A senha é obrigatória!' })
  }

  // check if user exists
  const user = await User.findOne({ email: email })

  if (!user) {
    return res.status(404).json({ msg: 'Usuário não encontrado!' })
  }

  // check if password match
  const checkPassword = await bcrypt.compare(password, user.password)

  if (!checkPassword) {
    return res.status(422).json({ msg: 'Senha inválida' })
  }

  try {
    const secret = process.env.SECRET

    const token = jwt.sign(
      {
        id: user._id,
      },
      secret,
    )

    res.status(200).json({ msg: 'Autenticação realizada com sucesso!', token })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
})

const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.folvv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  )
  .then(() => {
    console.log('Conectou ao banco!')
    app.listen(3000)
  })
  .catch((err) => console.log(err))
