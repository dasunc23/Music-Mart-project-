import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon, SearchIcon } from 'lucide-react';
import { useCart } from '../context/cartContext';
import { useAuth } from '../context/authContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            MusicMart
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 transition">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition">
              Products
            </Link>
            <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition">
              Cart
            </Link>
            {user ? (
              <>
                <span className="text-gray-700">{user.name}</span>
                <button onClick={logout} className="text-gray-700 hover:text-red-600 transition">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition">
                Login
              </Link>
            )}
          </nav>

          {/* Search, Cart, Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <Link to="/cart" className="relative p-2">
              <ShoppingCartIcon className="h-6 w-6 text-gray-700" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link to="/profile" className="p-2">
              <UserIcon className="h-6 w-6 text-gray-700" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <XIcon className="h-6 w-6 text-gray-700" />
            ) : (
              <MenuIcon className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>
                Products
              </Link>
              <Link to="/cart" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>
                Cart
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>
                Profile
              </Link>
              {user ? (
                <>
                  <span className="text-gray-700">{user.name}</span>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="text-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-indigo-600 transition" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
              )}
            </div>
            <div className="mt-4 relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
