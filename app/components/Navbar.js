// components/Navbar.js
import Link from 'next/link';
import { FaShoppingCart, FaUserCircle } from 'react-icons/fa'; // Importando o ícone de carrinho

export default function Navbar() {
  return (
    <nav className="fixed top-0 bg-blue-500 p-4 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-semibold">
          Minha Loja
        </Link>
{/*         <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/produtos" className="text-white hover:text-gray-300">
              Produtos
            </Link>
          </li>
          <li>
            <Link href="/sobre" className="text-white hover:text-gray-300">
              Sobre
            </Link>
          </li>
          <li>
            <Link href="/contato" className="text-white hover:text-gray-300">
              Contato
            </Link>
          </li>
        </ul> */}
        {/* Ícone do carrinho */}
        <div className="flex items-center space-x-4">
          <Link href="/carrinho" className="text-white hover:text-gray-300">
            <FaShoppingCart className="text-white" size={24} /> {/* Ícone do carrinho */}
          </Link>
          <Link href="/profile" className="text-white hover:text-gray-300">
            <FaUserCircle className="text-white" size={24} /> {/* Ícone do user */}
          </Link>
        </div>
      </div>
    </nav>
  );
}
