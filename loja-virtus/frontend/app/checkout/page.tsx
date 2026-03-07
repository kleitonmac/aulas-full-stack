'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navbar/Navbar'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { ordersAPI } from '../../services/api'

export default function CheckoutPage() {
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  })
  const [loading, setLoading] = useState(false)

  const { cart, getTotalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  if (!user) {
    router.push('/login')
    return null
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Carrinho vazio
            </h1>
            <Link
              href="/"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Voltar às Compras
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await ordersAPI.createOrder({
        shippingAddress: {
          ...shippingAddress,
          email: user.email,
        },
      })

      // For now, just simulate success
      alert('Compra realizada com sucesso! (Integração com Stripe pendente)')
      clearCart()
      router.push('/pedidos')
    } catch (error) {
      alert('Erro no processamento do pedido')
    } finally {
      setLoading(false)
    }
  }

  const handleAddressChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Finalizar Compra
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formulário de Checkout */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">
                Informações de Entrega
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    onChange={handleAddressChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    onChange={handleAddressChange}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      CEP
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    💳 Pagamento via Stripe será implementado em produção
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50"
                >
                  {loading ? 'Processando...' : 'Finalizar Compra'}
                </button>
              </form>
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Resumo do Pedido</h2>
              <div className="space-y-2 mb-4">
                {cart.map((item) => (
                  <div key={item.productId} className="flex justify-between">
                    <span>
                      {item.name} (x{item.quantity})
                    </span>
                    <span>
                      R${' '}
                      {(item.price * item.quantity).toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-gold-600">
                    R${' '}
                    {getTotalPrice().toLocaleString('pt-BR', {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
