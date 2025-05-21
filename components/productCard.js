import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCartIcon, StarIcon } from 'lucide-react';
import { useCart } from '../context/cartContext';
import Button from './button';

const ProductCard = ({ product }) => {
  // ✅ Hook must be at the top level
  const { addToCart } = useCart();

  // Return nothing if product is not defined
  if (!product) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative">
        <Link to={`/products/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
        </Link>
        {product.sale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            SALE
          </span>
        )}
        {product.new && (
          <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 hover:text-indigo-600 transition">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
        </div>

        <div className="mb-4">
          {product.discountPrice ? (
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
              <span className="ml-2 text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          )}
        </div>

        <div className="flex space-x-2">
          <Button variant="primary" fullWidth onClick={() => addToCart(product)}>
            <ShoppingCartIcon className="h-4 w-4 mr-1 inline" />
            Add to Cart
          </Button>
          <Link
            to={`/products/${product.id}`}
            className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition flex items-center justify-center"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
