/**
 * CONTROLADOR DE AUTENTICAÇÃO
 * =============================
 * Gerencia login, registro e logout de usuários
 * Usa bcryptjs para criptografar senhas
 */

const User = require('../models/User')

const bcrypt = require('bcryptjs') // Biblioteca para criptografia de senhas

module.exports = class UserController {
  // Exibe a página de login
  static login(req, res) {
    res.render('auth/login')
  }

  // Processa o login do usuário
  static async loginPost(req, res) {
    const { email, password } = req.body

    // Busca o usuário pelo email no banco de dados
    const user = await User.findOne({ where: { email: email } })

    // Se não encontrar o usuário
    if (!user) {
      res.render('auth/login', {
        message: 'Usuário não encontrado!',
      })
      return
    }

    // Compara a senha informada com a senha criptografada do banco
    const passwordMatch = bcrypt.compareSync(password, user.password)

    // Se a senha não bater
    if (!passwordMatch) {
      res.render('auth/login', {
        message: 'Senha inválida!',
      })
      return
    }

    // Se tudo estiver correto, autentica o usuário
    // Armazena o ID do usuário na sessão
    req.session.userid = user.id

    req.flash('message', 'Login realizado com sucesso!')

    req.session.save(() => {
      res.redirect('/')
    })
  }

  // Exibe a página de registro
  static register(req, res) {
    res.render('auth/register')
  }

  // Processa o registro de um novo usuário
  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body

    // Valida se as senhas conferem
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')
      return
    }

    // Verifica se o email já está registrado
    const checkIfUserExists = await User.findOne({ where: { email: email } })

    if (checkIfUserExists) {
      req.flash('message', 'O e-mail já está em uso!')
      res.render('auth/register')
      return
    }

    // Gera um "salt" para criptografia
    const salt = bcrypt.genSaltSync(10)
    // Criptografa a senha do usuário
    const hashedPassword = bcrypt.hashSync(password, salt)

    // Objeto com os dados do novo usuário
    const user = {
      name,
      email,
      password: hashedPassword, // Senha criptografada
    }

    // Cria o usuário no banco de dados
    User.create(user)
      .then((user) => {
        // Após criar, faz login automático (inicia sessão)
        req.session.userid = user.id

        req.flash('message', 'Cadastro realizado com sucesso!')

        req.session.save(() => {
          res.redirect('/')
        })
      })
      .catch((err) => console.log(err))
  }

  // Encerra a sessão do usuário (logout)
  static logout(req, res) {
    req.session.destroy() // Destroi a sessão
    res.redirect('/login')
  }
}
