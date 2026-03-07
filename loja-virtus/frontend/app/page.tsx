'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/navbar/Navbar'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import { products } from './data/products'

const VIDEOS = ['/video/video1.mp4', '/video/video.mp4']

export default function Home() {
  const featuredProducts = products.slice(0, 8)

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)

  const videoRef = useRef(null)

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length)
  }

  useEffect(() => {
    videoRef.current?.play()
  }, [currentVideoIndex])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[80vh] bg-black text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative group overflow-hidden h-full w-full">
            <video
              ref={videoRef}
              className="h-full w-full object-cover opacity-80 transition-transform duration-[2000ms] ease-out group-hover:scale-110"
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
            >
              <source src={VIDEOS[currentVideoIndex]} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/50" />
          </div>
        </div>

        {/* Conteúdo */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-24 flex flex-col gap-8">
          <div className="max-w-2xl">
            <p className="text-sm tracking-[0.35em] uppercase text-gold-400 mb-3">
              Virtus Pro
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4">
              A joalheria que celebra
              <span className="text-gold-400"> virtude, luxo e presença.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-200 mb-6">
              A Virtus Pro é uma joalheria digital inspirada na alta joalheria
              europeia.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/aneis"
                className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-3 rounded-full font-semibold"
              >
                Explorar coleção
              </Link>

              <Link
                href="/relogios"
                className="bg-gold-500 hover:bg-gold-600 text-black px-8 py-3 rounded-full font-semibold"
              >
                Ver relógios
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Produtos */}

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Produtos em Destaque
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
