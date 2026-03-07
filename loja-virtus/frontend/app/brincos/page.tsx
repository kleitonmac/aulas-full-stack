import Navbar from '../../components/navbar/Navbar'
import ProductCard from '../../components/ProductCard'
import { products } from '../data/products'

export default function BrincosPage() {
  const brincos = products.filter((product) => product.category === 'brincos')

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Brincos
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brincos.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
