import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from 'lucide-react';

const footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">MusicMart</h3>
            <p className="text-gray-400 mb-4">
              Your one-stop shop for high-quality musical instruments and accessories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <YoutubeIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=guitar" className="text-gray-400 hover:text-white transition">
                  Guitars
                </Link>
              </li>
              <li>
                <Link to="/products?category=keyboard" className="text-gray-400 hover:text-white transition">
                  Keyboards
                </Link>
              </li>
              <li>
                <Link to="/products?category=drums" className="text-gray-400 hover:text-white transition">
                  Drums
                </Link>
              </li>
              <li>
                <Link to="/products?category=recording" className="text-gray-400 hover:text-white transition">
                  Recording Equipment
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-400 hover:text-white transition">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Warranty Information
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
            <p className="text-gray-400 mb-4">
              Subscribe to get special offers, free giveaways, and product launches.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full text-gray-900 rounded-l focus:outline-none"
              />
              <button
                type="submit"
                className="bg-indigo-600 px-4 py-2 rounded-r hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} MusicMart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default footer;
