'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { cartAPI } from '../../services/api'

const CartContext = createContext()

export const useCart = () => useContext(CartContext)

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  // Load cart from server on mount
  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem('token')
      if (token) {
        try {
          const response = await cartAPI.getCart()
          setCart(response.data.items || [])
        } catch (error) {
          console.error('Error loading cart:', error)
        }
      }
    }
    loadCart()
  }, [])

  const addToCart = async (product) => {
    setLoading(true)
    try {
      const response = await cartAPI.addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
      setCart(response.data.items)
    } catch (error) {
      console.error('Error adding to cart:', error)
      // Fallback to local state if not logged in
      setCart((prev) => {
        const existing = prev.find((item) => item.productId === product.id)
        if (existing) {
          return prev.map((item) =>
            item.productId === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          )
        }
        return [...prev, { ...product, productId: product.id, quantity: 1 }]
      })
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (productId) => {
    setLoading(true)
    try {
      const response = await cartAPI.removeFromCart(productId)
      setCart(response.data.items)
    } catch (error) {
      console.error('Error removing from cart:', error)
      // Fallback
      setCart((prev) => prev.filter((item) => item.productId !== productId))
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      await removeFromCart(productId)
      return
    }
    setLoading(true)
    try {
      const response = await cartAPI.updateQuantity(productId, quantity)
      setCart(response.data.items)
    } catch (error) {
      console.error('Error updating quantity:', error)
      // Fallback
      setCart((prev) =>
        prev.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      )
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    setLoading(true)
    try {
      await cartAPI.clearCart()
      setCart([])
    } catch (error) {
      console.error('Error clearing cart:', error)
      setCart([])
    } finally {
      setLoading(false)
    }
  }

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0)

  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
