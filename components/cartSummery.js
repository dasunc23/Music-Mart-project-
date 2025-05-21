import React from 'react';
import { Link } from 'react-router-dom';
import Button from './button';

const CartSummary = ({ subtotal, shipping = 0, tax = 0, total, onCheckout }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900 font-medium">
            ${subtotal.toFixed(2)}
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
          <span className="text-gray-900 font-medium">${tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-3 mt-3 border-gray-200">
          <div className="flex justify-between font-medium">
            <span className="text-gray-900">Total</span>
            <span className="text-indigo-600 text-lg">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Link to="/checkout">
          <Button variant="primary" fullWidth size="lg" onClick={onCheckout}>
            Proceed to Checkout
          </Button>
        </Link>
        <div className="mt-4 text-center">
          <Link to="/products" className="text-sm text-indigo-600 hover:text-indigo-500">
            Continue Shopping
          </Link>
        </div>
      </div>
      <div className="mt-6 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8" />
          <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-8" />
        </div>
        <p className="text-xs text-gray-500 text-center">
          All transactions are secure and encrypted.
        </p>
      </div>
    </div>
  );
};

export default CartSummary;
