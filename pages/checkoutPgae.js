import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import CheckoutForm from '../components/checkout';
import CartItem from '../components/cart';

const Checkout = () => {
  const { items, totalPrice } = useCart();
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  // Calculate tax and shipping
  const tax = totalPrice * 0.08; // 8% tax
  const shipping = totalPrice > 50 ? 0 : 10;
  const orderTotal = totalPrice + tax + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Your cart is empty
        </h1>
        <p className="text-gray-600 mb-8">
          You need to add items to your cart before checking out.
        </p>
        <Link
          to="/products"
          className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:flex-grow">
            <CheckoutForm onComplete={() => setCheckoutComplete(true)} />
          </div>

          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="max-h-80 overflow-y-auto mb-6">
                {items.map(item => (
                  <div
                    key={item.product.id}
                    className="py-3 border-b border-gray-200 last:border-0"
                  >
                    <div className="flex items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="ml-4 flex-grow">
                        <h3 className="text-sm font-medium text-gray-900">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        $
                        {(
                          (item.product.discountPrice || item.product.price) *
                          item.quantity
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900 font-medium">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">Free</span>
                  ) : (
                    <span className="text-gray-900 font-medium">
                      ${shipping.toFixed(2)}
                    </span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900 font-medium">
                    ${tax.toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-3 mt-3 border-gray-200">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-900">Total</span>
                    <span className="text-indigo-600 text-lg">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
