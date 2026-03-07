import Link from 'next/link'
import { FaInstagram, FaFacebookF, FaTiktok } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Marca */}
          <div className="footer-section">
            <h2 className="footer-logo text-2xl font-bold mb-4">Virtus Pro</h2>
            <p className="text-white mb-4">
              Joias exclusivas que representam elegância, luxo e sofisticação.
              Descubra peças únicas para momentos especiais.
            </p>
            <div className="text-sm text-white">
              <p>Endereço: Rua das Joias, 123 - Centro, São Paulo</p>
              <p>Telefone: (11) 99999-9999</p>
              <p>Email: contato@virtuspro.com</p>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-white hover:text-gold-500 transition"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/aneis"
                  className="text-white hover:text-gold-500 transition"
                >
                  Anéis
                </Link>
              </li>
              <li>
                <Link
                  href="/colares"
                  className="text-white hover:text-gold-500 transition"
                >
                  Colares
                </Link>
              </li>
              <li>
                <Link
                  href="/brincos"
                  className="text-white hover:text-gold-500 transition"
                >
                  Brincos
                </Link>
              </li>
              <li>
                <Link
                  href="/relogios"
                  className="text-white hover:text-gold-500 transition"
                >
                  Relógios
                </Link>
              </li>
            </ul>
          </div>

          {/* Suporte */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contato"
                  className="text-white hover:text-gold-500 transition"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-white hover:text-gold-500 transition"
                >
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link
                  href="/entrega"
                  className="text-white hover:text-gold-500 transition"
                >
                  Entrega
                </Link>
              </li>
              <li>
                <Link
                  href="/privacidade"
                  className="text-white hover:text-gold-500 transition"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link
                  href="/termos"
                  className="text-white hover:text-gold-500 transition"
                >
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>

          {/* Redes sociais */}
          <div className="footer-section">
            <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-white hover:text-gold-500 transition"
                aria-label="Instagram"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-gold-500 transition"
                aria-label="Facebook"
              >
                <FaFacebookF size={24} />
              </a>
              <a
                href="#"
                className="text-white hover:text-gold-500 transition"
                aria-label="TikTok"
              >
                <FaTiktok size={24} />
              </a>
            </div>
            <p className="text-white mt-4 text-sm">
              Receba as últimas novidades e ofertas exclusivas.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-white text-sm">
            © {new Date().getFullYear()} Virtus Pro. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
