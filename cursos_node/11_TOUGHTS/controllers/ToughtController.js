/**
 * CONTROLADOR DE PENSAMENTOS
 * ===========================
 * Gerencia todas as operações CRUD (Create, Read, Update, Delete) de pensamentos
 * Também controla a exibição e filtro de pensamentos na página inicial
 */

const Tought = require('../models/Tought')
const User = require('../models/User')

const { Op } = require('sequelize') // Op: Operadores do Sequelize (like, gt, etc)

module.exports = class ToughController {
  // Exibe o painel do usuário com seus pensamentos
  static async dashboard(req, res) {
    const userId = req.session.userid

    // Busca o usuário e todos os seus pensamentos
    const user = await User.findOne({
      where: { id: userId },
      include: Tought, // Inclui os pensamentos relacionados
      plain: true,
    })

    // Extrai apenas os dados dos pensamentos
    const toughts = user.Toughts.map((result) => result.dataValues)

    // Define se há pensamentos ou não
    let emptyToughts = toughts.length === 0 ? true : false

    // Renderiza a view do painel com os pensamentos
    res.render('toughts/dashboard', { toughts, emptyToughts })
  }

  // Exibe o formulário para criar um novo pensamento
  static createTought(req, res) {
    res.render('toughts/create')
  }

  // Salva um novo pensamento no banco de dados
  static createToughtSave(req, res) {
    const tought = {
      title: req.body.title, // Conteúdo vindo do formulário
      UserId: req.session.userid, // ID do usuário logado
    }

    // Cria o pensamento no banco de dados
    Tought.create(tought)
      .then(() => {
        // Exibe mensagem de sucesso
        req.flash('message', 'Pensamento criado com sucesso!')
        // Salva a sessão e redireciona
        req.session.save(() => {
          res.redirect('/toughts/dashboard')
        })
      })
      .catch((err) => console.log(err))
  }

  // Exibe a página inicial com todos os pensamentos (com busca e ordenação)
  static showToughts(req, res) {
    // Captura os parâmetros de busca (query) enviados pela URL
    let search = req.query.search ? req.query.search : ''

    // Define a ordem dos resultados (mais recentes primeiro por padrão)
    let order = req.query.order === 'old' ? 'ASC' : 'DESC'

    // Busca todos os pensamentos com filtro de busca e ordenação
    Tought.findAll({
      include: User, // Inclui dados do autor do pensamento
      where: {
        // Usa operador LIKE para buscar pensamentos que contenham o texto
        title: { [Op.like]: `%${search}%` },
      },
      // Ordena por data de criação
      order: [['createdAt', order]],
    })
      .then((data) => {
        // Converte a quantidade de pensamentos para booleano
        let toughtsQty = data.length > 0 ? data.length : false

        // Converte os dados para objetos simples (sem métodos Sequelize)
        const toughts = data.map((result) => result.get({ plain: true }))

        // Renderiza a página inicial com os dados
        res.render('toughts/home', { toughts, toughtsQty, search })
      })
      .catch((err) => console.log(err))
  }

  // Deleta um pensamento do banco de dados
  static removeTought(req, res) {
    const id = req.body.id

    // Remove o pensamento pelo ID
    Tought.destroy({ where: { id: id } })
      .then(() => {
        // Exibe mensagem de sucesso
        req.flash('message', 'Pensamento removido com sucesso!')
        // Redireciona para o painel
        req.session.save(() => {
          res.redirect('/toughts/dashboard')
        })
      })
      .catch((err) => console.log(err))
  }

  // Exibe o formulário de edição de um pensamento
  static updateTought(req, res) {
    const id = req.params.id

    // Busca o pensamento pelo ID
    Tought.findOne({ where: { id: id }, raw: true })
      .then((tought) => {
        // Renderiza a view de edição com os dados do pensamento
        res.render('toughts/edit', { tought })
      })
      .catch((err) => console.log(err))
  }

  // Salva as alterações de um pensamento no banco de dados
  static updateToughtPost(req, res) {
    const id = req.body.id

    // Objeto com os novos dados do pensamento
    const tought = {
      title: req.body.title,
      description: req.body.description,
    }

    // Atualiza o pensamento no banco de dados
    Tought.update(tought, { where: { id: id } })
      .then(() => {
        // Exibe mensagem de sucesso
        req.flash('message', 'Pensamento atualizado com sucesso!')
        // Redireciona para o painel
        req.session.save(() => {
          res.redirect('/toughts/dashboard')
        })
      })
      .catch((err) => console.log(err))
  }
}
