'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '../../components/navbar/Navbar'
import { useAuth } from '../context/AuthContext'
import { adminAPI, ordersAPI } from '../../services/api'

export default function AdminPage() {
  const [stats, setStats] = useState({})
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user || !user.isAdmin) {
      router.push('/')
      return
    }

    const loadData = async () => {
      try {
        const [statsRes, ordersRes, usersRes] = await Promise.all([
          adminAPI.getStats(),
          ordersAPI.getAllOrders(),
          adminAPI.getUsers(),
        ])
        setStats(statsRes.data)
        setOrders(ordersRes.data)
        setUsers(usersRes.data)
      } catch (error) {
        console.error('Error loading admin data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [user, router])

  const updateOrderStatus = async (orderId, status) => {
    try {
      await ordersAPI.updateOrderStatus(orderId, status)
      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      )
    } catch (error) {
      console.error('Error updating order:', error)
    }
  }

  if (!user || !user.isAdmin) {
    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-20 px-4">
          <div className="max-w-6xl mx-auto text-center py-16">
            <p>Carregando painel admin...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8">
            Painel Administrativo
          </h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-600">
                Total de Usuários
              </h3>
              <p className="text-3xl font-bold text-blue-600">
                {stats.totalUsers}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-600">
                Total de Pedidos
              </h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.totalOrders}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-600">
                Receita Total
              </h3>
              <p className="text-3xl font-bold text-gold-600">
                R${' '}
                {stats.totalRevenue?.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                }) || '0,00'}
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-600">
                Pedidos Pendentes
              </h3>
              <p className="text-3xl font-bold text-red-600">
                {stats.pendingOrders}
              </p>
            </div>
          </div>

          {/* Orders Management */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Gerenciar Pedidos</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">ID do Pedido</th>
                    <th className="text-left py-2">Cliente</th>
                    <th className="text-left py-2">Total</th>
                    <th className="text-left py-2">Status</th>
                    <th className="text-left py-2">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="py-2">{order._id.slice(-8)}</td>
                      <td className="py-2">{order.userId?.name || 'N/A'}</td>
                      <td className="py-2">
                        R${' '}
                        {order.total.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className="py-2">
                        <select
                          value={order.status}
                          onChange={(e) =>
                            updateOrderStatus(order._id, e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="pending">Pendente</option>
                          <option value="paid">Pago</option>
                          <option value="shipped">Enviado</option>
                          <option value="delivered">Entregue</option>
                        </select>
                      </td>
                      <td className="py-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Users List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Usuários</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Nome</th>
                    <th className="text-left py-2">Email</th>
                    <th className="text-left py-2">Admin</th>
                    <th className="text-left py-2">Data de Registro</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="border-b">
                      <td className="py-2">{user.name}</td>
                      <td className="py-2">{user.email}</td>
                      <td className="py-2">{user.isAdmin ? 'Sim' : 'Não'}</td>
                      <td className="py-2">
                        {new Date(user.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
