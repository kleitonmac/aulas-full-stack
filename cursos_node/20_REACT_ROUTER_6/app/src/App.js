/**
 * COMPONENTE APP - React Router v6
 * =================================
 * Componente principal da aplicação que configura o sistema de roteamento
 * Define todas as rotas da aplicação usando React Router v6 (novo padrão)
 * Usa <Router>, <Routes> e <Route> para navegação entre páginas
 */

import {
  BrowserRouter as Router, // Router: envolve a aplicação para permitir roteamento
  Routes, // Routes: container para all rotas
  Route, // Route: define cada rota individual
  Navigate, // Navigate: redireciona para outra rota
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
      {/* Routes define todas as rotas disponíveis */}
      <Routes>
        {/* Rota para página inicial */}
        <Route path="/" element={<Home />} />
        {/* Rota para lista de usuários */}
        <Route path="/users" element={<Users />} />
        {/* Rota que redireciona /allusers para /users */}
        <Route path="/allusers" element={<Navigate to="/users" />} />
        {/* Rota para página de contato */}
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  )
}

export default App
