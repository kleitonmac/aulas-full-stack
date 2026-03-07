'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { authAPI } from '../../services/api'

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

interface AuthContextType {
  user: User | null
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>
  logout: () => void
  loading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Verificar autenticação ao carregar
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')

        if (token && userData) {
          const parsedUser = JSON.parse(userData)
          // Validar se o usuário tem ID
          if (parsedUser && parsedUser.id) {
            setUser(parsedUser)
          } else {
            // Dados inválidos, limpar storage
            localStorage.removeItem('token')
            localStorage.removeItem('user')
          }
        }
      } catch (error) {
        console.error('Erro ao inicializar autenticação:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      // Validações básicas
      if (!email || !password) {
        return { success: false, message: 'Email e senha são obrigatórios' }
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        return { success: false, message: 'Email inválido' }
      }

      if (password.length < 6) {
        return {
          success: false,
          message: 'Senha deve ter pelo menos 6 caracteres',
        }
      }

      const response = await authAPI.login({
        email: email.toLowerCase().trim(),
        password,
      })

      if (!response.data.token || !response.data.user) {
        return { success: false, message: 'Resposta inválida do servidor' }
      }

      const { token, user: userData } = response.data

      // Validar se o usuário retornado tem ID
      if (!userData.id) {
        return { success: false, message: 'Dados do usuário inválidos' }
      }

      // Armazenar dados de forma segura
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)

      return { success: true }
    } catch (error: unknown) {
      console.error('Erro no login:', error)

      // Tratamento específico de erros
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } }
      }
      if (axiosError.response?.status === 400) {
        return { success: false, message: 'Email ou senha incorretos' }
      } else if (axiosError.response?.status === 429) {
        return {
          success: false,
          message: 'Muitas tentativas. Tente novamente mais tarde',
        }
      } else if (axiosError.response?.status >= 500) {
        return { success: false, message: 'Erro no servidor. Tente novamente' }
      } else {
        return {
          success: false,
          message: axiosError.response?.data?.message || 'Erro ao fazer login',
        }
      }
    }
  }, [])

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        // Validações básicas
        if (!name || !email || !password) {
          return {
            success: false,
            message: 'Nome, email e senha são obrigatórios',
          }
        }

        if (name.trim().length < 2) {
          return {
            success: false,
            message: 'Nome deve ter pelo menos 2 caracteres',
          }
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
          return { success: false, message: 'Email inválido' }
        }

        if (password.length < 6) {
          return {
            success: false,
            message: 'Senha deve ter pelo menos 6 caracteres',
          }
        }

        const response = await authAPI.register({
          name: name.trim(),
          email: email.toLowerCase().trim(),
          password,
        })

        if (!response.data.token || !response.data.user) {
          return { success: false, message: 'Resposta inválida do servidor' }
        }

        const { token, user: userData } = response.data

        // Validar se o usuário retornado tem ID
        if (!userData.id) {
          return { success: false, message: 'Dados do usuário inválidos' }
        }

        // Armazenar dados de forma segura
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
        setUser(userData)

        return { success: true }
      } catch (error: unknown) {
        console.error('Erro no registro:', error)

        // Tratamento específico de erros
        const axiosError = error as {
          response?: { status?: number; data?: { message?: string } }
        }
        if (axiosError.response?.status === 400) {
          return {
            success: false,
            message: 'Email já cadastrado ou dados inválidos',
          }
        } else if (axiosError.response?.status >= 500) {
          return {
            success: false,
            message: 'Erro no servidor. Tente novamente',
          }
        } else {
          return {
            success: false,
            message:
              axiosError.response?.data?.message || 'Erro ao criar conta',
          }
        }
      }
    },
    [],
  )

  const logout = useCallback(() => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }, [])

  const isAuthenticated = !!user && !!user.id

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
