/**
 * CONTEXTO DE USUÁRIO
 * ====================
 * Usa React Context API para gerenciar estado global de autenticação
 * Permite que todos os componentes acessem informações do usuário logado
 * Providencia funções: register, login, logout
 */

import React, { createContext } from 'react'

import useAuth from '../hooks/useAuth' // Custom hook que contém a lógica de autenticação

// Cria o contexto que será compartilhado na aplicação
const Context = createContext()

function UserProvider({ children }) {
  // Obtém as funções e estados de autenticação do hook customizado
  const { authenticated, loading, register, login, logout } = useAuth()

  // Fornece esses valores para todos os componentes filhos
  return (
    <Context.Provider
      value={{ loading, authenticated, register, login, logout }}
    >
      {children}
    </Context.Provider>
  )
}

export { Context, UserProvider }
