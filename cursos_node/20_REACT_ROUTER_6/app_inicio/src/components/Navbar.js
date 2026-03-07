/**
 * COMPONENTE NAVBAR - Versão Anterior
 * ====================================
 * Barra de navegação que aparece em todas as páginas
 * Usa React Router Link para navegação sem recarregar a página
 * Fornece links para as três páginas da aplicação: Home, Usuários e Contato
 */

import { Link } from 'react-router-dom' // Link: navegação sem recarregar (SPA)

import styles from './Navbar.module.css' // Importa estilos CSS em escopo local

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          {/* Link para página inicial */}
          <Link to="/">Home</Link>
        </li>
        <li>
          {/* Link para lista de usuários */}
          <Link to="/users">Usuários</Link>
        </li>
        <li>
          {/* Link para página de contato */}
          <Link to="/contact">Contato</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
