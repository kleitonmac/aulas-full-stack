/**
 * PÁGINA DE USUÁRIOS - Versão Anterior
 * ==================================
 * Página que exibe lista de usuários
 * Demonstra o uso do hook useHistory para navegação programada (v5)
 * useHistory foi substituito por useNavigate em React Router v6
 * Um botão permite voltar à página inicial
 */

import { useHistory } from 'react-router-dom' // Hook para navegação programada (v5 - descontinuado)

function Users() {
  // useHistory retorna objeto com métodos de navegação (v5 - antiga abordagem)
  const history = useHistory()

  // Função acionada quando o botão é clicado
  function handleClick() {
    history.push('/') // Navega para a página inicial e adiciona à histórico
  }

  return (
    <section>
      <p>
        {/* Botão que aciona a navegação programada */}
        Voltar para a <button onClick={handleClick}>Home</button>
      </p>
      <h1>Users</h1>
    </section>
  )
}

export default Users
