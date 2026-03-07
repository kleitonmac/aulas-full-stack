'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../../components/navbar/Navbar'
import { useCart } from '../../app/context/CartContext'

export default function CarrinhoPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carrinho de Compras
          </h1>
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-500 mb-4">
              <svg
                className="mx-auto h-24 w-24"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-gray-600 mb-6">
              Adicione alguns produtos incríveis da nossa coleção!
            </p>
            <Link
              href="/"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Carrinho de Compras
        </h1>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="divide-y divide-gray-200">
            {cart.map((item) => (
              <div key={item.productId} className="p-6 flex items-center">
                <div className="flex-shrink-0 w-20 h-20">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                <div className="ml-6 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {item.name}
                  </h3>
                  <p className="text-yellow-600 font-semibold">
                    R$ {item.price.toFixed(2)}
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-center min-w-[3rem]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="text-red-500 hover:text-red-700 p-2"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 px-6 py-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Total:
              </span>
              <span className="text-2xl font-bold text-yellow-600">
                R$ {getTotalPrice().toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-between">
          <Link
            href="/"
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continuar Comprando
          </Link>
          <Link
            href="/checkout"
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Finalizar Compra
          </Link>
        </div>
      </div>
    </div>
  )
}
