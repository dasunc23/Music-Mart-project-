import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCardIcon, LockIcon } from 'lucide-react';
import Button from './button';
import { useCart } from '../context/cartContext';

const PaymentForm = () => {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const [formData, setFormData] = useState({
    cardName: '',
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'cardNumber') {
      const formatted = value
        .replace(/\s/g, '')
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);

      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
      return;
    }

    if (name === 'cvv' && !/^\d{0,4}$/.test(value)) {
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cardName.trim()) newErrors.cardName = 'Name on card is required';
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (formData.cardNumber.replace(/\s/g, '').length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!formData.expiryMonth) newErrors.expiryMonth = 'Required';
    if (!formData.expiryYear) newErrors.expiryYear = 'Required';

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (formData.cvv.length < 3) {
      newErrors.cvv = 'CVV must be 3-4 digits';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setIsProcessing(true);

      setTimeout(() => {
        clearCart();
        navigate('/');
        alert('Payment successful! Thank you for your order.');
        setIsProcessing(false);
      }, 2000);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <CreditCardIcon className="h-6 w-6 text-gray-400" />
            <span className="font-medium">Credit / Debit Card</span>
          </div>
          <div className="flex space-x-2">
            <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-8" />
            <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="Discover" className="h-8" />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
              Name on Card
            </label>
            <input
              type="text"
              id="cardName"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Smith"
              className={`w-full border ${errors.cardName ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.cardName && <p className="mt-1 text-sm text-red-600">{errors.cardName}</p>}
          </div>

          <div>
            <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="1234 5678 9012 3456"
              className={`w-full border ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
            />
            {errors.cardNumber && <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiration Date</label>
              <div className="flex space-x-2">
                <div className="w-1/2">
                  <select
                    id="expiryMonth"
                    name="expiryMonth"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    className={`w-full border ${errors.expiryMonth ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <option value="">Month</option>
                    {Array.from({ length: 12 }, (_, i) => {
                      const month = i + 1;
                      return (
                        <option key={month} value={month.toString().padStart(2, '0')}>
                          {month.toString().padStart(2, '0')}
                        </option>
                      );
                    })}
                  </select>
                  {errors.expiryMonth && <p className="mt-1 text-sm text-red-600">{errors.expiryMonth}</p>}
                </div>

                <div className="w-1/2">
                  <select
                    id="expiryYear"
                    name="expiryYear"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    className={`w-full border ${errors.expiryYear ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                  >
                    <option value="">Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  {errors.expiryYear && <p className="mt-1 text-sm text-red-600">{errors.expiryYear}</p>}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className={`w-full border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
              />
              {errors.cvv && <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>}
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center">
          <LockIcon className="h-4 w-4 text-green-500 mr-2" />
          <span className="text-sm text-gray-600">
            Your payment information is secure and encrypted
          </span>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary" size="lg" disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Complete Payment'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;
