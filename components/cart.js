import React from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MinusIcon, TrashIcon } from 'lucide-react';
import { useCart } from '../context/cartContext';

const CartItem = ({ product, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(product.id, newQuantity);
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center py-6 border-b border-gray-200">
      {/* Product Image */}
      <div className="w-full sm:w-24 h-24 flex-shrink-0 mb-4 sm:mb-0">
        <Link to={`/products/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover rounded"
          />
        </Link>
      </div>
      {/* Product Details */}
      <div className="sm:ml-6 flex-grow">
        <Link
          to={`/products/${product.id}`}
          className="text-lg font-medium text-gray-900 hover:text-indigo-600"
        >
          {product.name}
        </Link>
        <div className="mt-1 text-sm text-gray-500">
          ${product.discountPrice?.toFixed(2) || product.price.toFixed(2)}
        </div>
      </div>
      {/* Quantity Controls */}
      <div className="flex items-center mt-4 sm:mt-0">
        <button
          onClick={() => handleQuantityChange(quantity - 1)}
          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="mx-3 w-8 text-center">{quantity}</span>
        <button
          onClick={() => handleQuantityChange(quantity + 1)}
          className="p-1 rounded-full border border-gray-300 hover:bg-gray-100"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
      {/* Price */}
      <div className="mt-4 sm:mt-0 sm:ml-6 text-right">
        <div className="text-lg font-medium text-gray-900">
          ${((product.discountPrice || product.price) * quantity).toFixed(2)}
        </div>
        <button
          onClick={() => removeFromCart(product.id)}
          className="mt-1 text-sm text-red-600 hover:text-red-500 flex items-center"
        >
          <TrashIcon className="h-4 w-4 mr-1" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
