'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import './Navbar.modules.css'
import { FiMenu, FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi'
import { useAuth } from '../../app/context/AuthContext'
import { useCart } from '../../app/context/CartContext'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const sidebarRef = useRef(null)
  const buttonRef = useRef(null)

  const { getTotalItems } = useCart()
  const { user, logout } = useAuth()

  // fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        {/* Menu Toggle */}
        <button
          ref={buttonRef}
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FiMenu size={24} />
        </button>

        {/* Logo */}
        <Link href="/" className="logo-link">
          <h1 className="logo">
            <img
              className="logo-image"
              src="/virtus-header.png"
              alt="Virtus Pro"
            />
          </h1>
        </Link>

        {/* Ações */}
        <div className="nav-actions">
          <button className="icon-btn">
            <FiSearch size={22} />
          </button>

          {user ? (
            <button onClick={logout} className="icon-btn">
              <FiUser size={22} />
            </button>
          ) : (
            <Link href="/login" className="icon-btn">
              <FiUser size={22} />
            </Link>
          )}

          <Link href="/carrinho" className="icon-btn cart-btn">
            <FiShoppingCart size={22} />
            {getTotalItems() > 0 && (
              <span className="cart-badge">{getTotalItems()}</span>
            )}
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`sidebar ${menuOpen ? 'active' : ''}`}>
        <ul>
          <li>
            <Link href="/">Início</Link>
          </li>
          <li>
            <Link href="/aneis">Anéis</Link>
          </li>
          <li>
            <Link href="/colares">Colares</Link>
          </li>
          <li>
            <Link href="/brincos">Brincos</Link>
          </li>
          <li>
            <Link href="/relogios">Relógios</Link>
          </li>

          {user?.isAdmin && (
            <li>
              <Link href="/admin">Admin</Link>
            </li>
          )}

          <li>
            <Link href="/pedidos">Meus Pedidos</Link>
          </li>
        </ul>
      </div>
    </>
  )
}

export default Navbar
