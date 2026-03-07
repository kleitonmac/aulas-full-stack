'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import Navbar from '../../components/navbar/Navbar'
import { FaEye, FaEyeSlash, FaUser, FaLock, FaEnvelope } from 'react-icons/fa'

export default function LoginPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const { login, register } = useAuth()
  const router = useRouter()

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (isRegister) {
      if (!formData.name.trim()) {
        newErrors.name = 'Nome é obrigatório'
      } else if (formData.name.trim().length < 2) {
        newErrors.name = 'Nome deve ter pelo menos 2 caracteres'
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage('')
    setErrors({})

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const result = isRegister
        ? await register(
            formData.name.trim(),
            formData.email.toLowerCase().trim(),
            formData.password,
          )
        : await login(formData.email.toLowerCase().trim(), formData.password)

      if (result.success) {
        setMessage('Login realizado com sucesso!')
        setTimeout(() => {
          router.push('/')
        }, 1000)
      } else {
        setMessage(result.message || 'Erro na operação')
      }
    } catch {
      setMessage('Erro inesperado. Tente novamente.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      <div className="pt-20 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {isRegister ? 'Criar Conta' : 'Bem-vindo de volta'}
            </h1>
            <p className="text-yellow-500 font-medium">
              {isRegister ? 'Junte-se à Virtus Pro' : 'Entre na sua conta'}
            </p>
          </div>

          {message && (
            <div
              className={`mb-6 p-4 rounded-lg text-sm ${
                message.includes('sucesso')
                  ? 'bg-green-50 border border-green-200 text-green-700'
                  : 'bg-red-50 border border-red-200 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {isRegister && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome Completo
                </label>
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
                  <input
                    type="text"
                    name="name"
                    required
                    className={`w-full pl-10 pr-4 py-3 text-black border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Digite seu nome"
                    onChange={handleChange}
                    value={formData.name}
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
                <input
                  type="email"
                  name="email"
                  required
                  className={`w-full pl-10 pr-4 py-3 border text-black rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="seu@email.com"
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Senha
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 text-black transform -translate-y-1/2 text-gray-700" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  className={`w-full pl-10 pr-12 py-3 border text-black rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Digite sua senha"
                  onChange={handleChange}
                  value={formData.password}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white py-3 px-4 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Carregando...
                </div>
              ) : isRegister ? (
                'Criar Conta'
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-yellow-600 hover:text-yellow-700 font-medium transition-colors duration-200"
            >
              {isRegister
                ? 'Já tem conta? Faça login'
                : 'Não tem conta? Crie uma agora'}
            </button>
          </div>

          {!isRegister && (
            <div className="mt-4 text-center">
              <Link
                href="/forgot-password"
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
              >
                Esqueceu sua senha?
              </Link>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-gray-600 hover:text-gray-800 font-medium transition-colors duration-200"
            >
              ← Voltar ao início
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
