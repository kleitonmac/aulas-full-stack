'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../../components/navbar/Navbar'
import { useAuth } from '../context/AuthContext'
import { ordersAPI } from '../../services/api'

export default function PedidosPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const response = await ordersAPI.getUserOrders()
        setOrders(response.data)
      } catch (error) {
        console.error('Error loading orders:', error)
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      loadOrders()
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center py-16">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Acesso negado
            </h1>
            <p className="text-gray-600 mb-8">
              Faça login para ver seus pedidos.
            </p>
            <Link
              href="/login"
              className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold"
            >
              Fazer Login
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-4xl mx-auto text-center py-16">
            <p>Carregando pedidos...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Meus Pedidos
          </h1>

          {orders.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-xl font-semibold text-gray-600 mb-4">
                Nenhum pedido encontrado
              </h2>
              <Link
                href="/"
                className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3 rounded-lg font-semibold"
              >
                Começar a Comprar
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        Pedido #{order._id.slice(-8)}
                      </h3>
                      <p className="text-gray-600">
                        {new Date(order.createdAt).toLocaleDateString('pt-BR')}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === 'delivered'
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'shipped'
                              ? 'bg-blue-100 text-blue-800'
                              : order.status === 'paid'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {order.status === 'delivered'
                          ? 'Entregue'
                          : order.status === 'shipped'
                            ? 'Enviado'
                            : order.status === 'paid'
                              ? 'Pago'
                              : 'Pendente'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>
                          {item.name} (x{item.quantity})
                        </span>
                        <span>
                          R${' '}
                          {(item.price * item.quantity).toLocaleString(
                            'pt-BR',
                            { minimumFractionDigits: 2 },
                          )}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-gold-600">
                        R${' '}
                        {order.total.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>

                  {order.shippingAddress && (
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-semibold mb-2">
                        Endereço de Entrega:
                      </h4>
                      <p className="text-gray-600">
                        {order.shippingAddress.name}
                        <br />
                        {order.shippingAddress.address}
                        <br />
                        {order.shippingAddress.city} -{' '}
                        {order.shippingAddress.zipCode}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
