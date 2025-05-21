import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = ({ onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    discountPrice: '',
    image: '',
    category: '',
    stock: '',
    featured: false,
    new: false,
    sale: false
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/products', form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setForm({
        name: '',
        description: '',
        price: '',
        discountPrice: '',
        image: '',
        category: '',
        stock: '',
        featured: false,
        new: false,
        sale: false
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold">Add New Product</h2>

      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required className="input" />
      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required className="input" />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required className="input" />
      <input type="number" name="discountPrice" placeholder="Discount Price" value={form.discountPrice} onChange={handleChange} className="input" />
      <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} required className="input" />
      <input type="text" name="category" placeholder="Category ID" value={form.category} onChange={handleChange} required className="input" />
      <input type="number" name="stock" placeholder="Stock Quantity" value={form.stock} onChange={handleChange} required className="input" />

      <label className="flex items-center space-x-2">
        <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
        <span>Featured</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="new" checked={form.new} onChange={handleChange} />
        <span>New</span>
      </label>
      <label className="flex items-center space-x-2">
        <input type="checkbox" name="sale" checked={form.sale} onChange={handleChange} />
        <span>Sale</span>
      </label>

      {error && <div className="text-red-500">{error}</div>}
      <button type="submit" disabled={loading} className="btn btn-primary">
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default AddProductForm;
