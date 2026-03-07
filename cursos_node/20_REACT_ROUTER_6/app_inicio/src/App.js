/**
 * COMPONENTE APP - React Router v5 (Versão Anterior)
 * ====================================================
 * Verso anterior do App usando React Router v5
 * Diferenças em relação à versão v6 (app/):
 * - Usa <Switch> em vez de <Routes>
 * - Usa <Redirect> em vez de <Navigate>
 * - Usa sintaxe antiga com children em vez de elemento 'element'
 * - Usa propriedade 'exact' para rotas exatas
 */

import {
  BrowserRouter as Router, // Router: envolve a aplicação para permite roteamento
  Switch, // Switch: container para rotas (v5 - descontinuado em v6)
  Route, // Route: define cada rota individual
  Redirect, // Redirect: redireciona de uma rota para outra (v5 - agora é Navigate)
} from 'react-router-dom'

// Importa os componentes de páginas
import Home from './components/pages/Home'
import Users from './components/pages/Users'
import Contact from './components/pages/Contact'

// Importa o componente Navbar (barra de navegação)
import Navbar from './components/Navbar'

function App() {
  return (
    // Router encapsula toda a aplicação para habilitar roteamento
    <Router>
      {/* Navbar aparece em todas as páginas */}
      <Navbar />
      {/* Switch define todas as rotas disponíveis (sintaxe v5) */}
      <Switch>
        {/* Rota para página inicial - 'exact' significa correspondência exata do caminho */}
        <Route path="/" exact>
          <Home />
        </Route>
        {/* Rota para lista de usuários */}
        <Route path="/users">
          <Users />
        </Route>
        {/* Redirect redireciona /allusers para /users (forma v5) */}
        <Redirect from="/allusers" to="/users" />
        {/* Rota para página de contato */}
        <Route path="/contact">
          <Contact />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
