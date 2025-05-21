import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, ArrowLeftIcon } from 'lucide-react';
import { useCart } from '../context/cartContext';
import CartItem from '../components/cart';
import CartSummary from '../components/cartSummery';
import Button from '../components/button';

const Cart = () => {
  const {
    items,
    totalItems,
    totalPrice,
    clearCart
  } = useCart();

  // Calculate tax (for example purposes)
  const tax = totalPrice * 0.08; // 8% tax

  // Calculate shipping (free over $50)
  const shipping = totalPrice > 50 ? 0 : 10;

  // Calculate total
  const orderTotal = totalPrice + tax + shipping;

  if (totalItems === 0) {
    return (
      <div className="bg-white w-full">
        <div className="container mx-auto px-4 py-16 max-w-4xl text-center">
          <div className="mb-6">
            <ShoppingBagIcon className="h-16 w-16 mx-auto text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products">
            <Button variant="primary" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-grow">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium text-gray-900">
                  Cart Items ({totalItems})
                </h2>
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-500"
                >
                  Clear Cart
                </button>
              </div>
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <CartItem
                    key={item.product.id}
                    product={item.product}
                    quantity={item.quantity}
                  />
                ))}
              </div>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-500"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <CartSummary
              subtotal={totalPrice}
              shipping={shipping}
              tax={tax}
              total={orderTotal}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
