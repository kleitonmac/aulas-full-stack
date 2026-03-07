/**
 * PÁGINA DE USUÁRIOS
 * ==================
 * Página que exibe lista de usuários
 * Demonstra o uso do hook useNavigate para programação de navegação
 * Um botão permite voltar à página inicial
 */

import { useNavigate } from 'react-router-dom' // Hook para navegação programada

function Users() {
  // useNavigate retorna uma função para navegar quando necessário
  const navigate = useNavigate()

  // Função acionada quando o botão é clicado
  function handleClick() {
    navigate('/') // Navega para a página inicial
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
