'use client'

import Image from 'next/image'
import { useCart } from '../app/context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.name}
        </h3>
        <p className="text-2xl font-bold text-gold-600 mb-4">
          R${' '}
          {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => addToCart(product)}
            className="flex-1 bg-gold-500 hover:bg-gold-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
          >
            Adicionar ao Carrinho
          </button>
          <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
            Comprar
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
