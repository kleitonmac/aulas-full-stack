/**
 * PÁGINA HOME - Versão Anterior
 * ============================
 * Página inicial da aplicação
 * Apresenta um link para visualizar todos os usuários
 * Demonstra uso do componente Link do React Router
 */

import { Link } from 'react-router-dom' // Link: navegação sem recarregar

function Home() {
  return (
    <section>
      <h1>Home</h1>
      <p>
        {/* Link para a seção de usuários */}
        Ver todos os usuários: <Link to="/allusers">Clique aqui</Link>
      </p>
    </section>
  )
}

export default Home
