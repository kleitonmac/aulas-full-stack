/**
 * PONTO DE ENTRADA DA APLICAÇÃO REACT
 * ===================================
 * Arquivo de entrada que renderiza a aplicação React no DOM
 * Este é o primeiro arquivo executado quando a aplicação inicia
 * Renderiza o componente App no elemento HTML com id 'root'
 */

import React from 'react' // Biblioteca React core
import ReactDOM from 'react-dom' // Biblioteca para renderizar em DOM
import './index.css' // Importa estilos globais
import App from './App' // Importa componente principal da aplicação

// Renderiza a aplicaão React no elemento HTML com id 'root'
// StrictMode ajuda a detectar problemas potenciais em desenvolvimento
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'), // Elemento para renderizar (em index.html)
)
