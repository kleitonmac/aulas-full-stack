/**
 * MIDDLEWARE DE AUTENTICAÇÃO
 * ==========================
 * Verifica se o usuário está logado antes de acessar rotas protegidas
 * Se não estiver autenticado, é redirecionado para a página de login
 */

module.exports.checkAuth = function (req, res, next) {
  // Recupera o ID do usuário da sessão
  const userId = req.session.userid

  // Se não há usuário logado, redireciona para login
  if (!userId) {
    res.redirect('/login')
    return
  }

  // Se há usuário logado, continua para a próxima função (middleware seguinte)
  next()
}
