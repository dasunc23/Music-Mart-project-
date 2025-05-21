import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddProductForm from './productForm';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const token = localStorage.getItem('token');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products:', error.response?.data || error.message);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Failed to delete product:', error.response?.data || error.message);
    }
  };

  const handleAddSuccess = () => {
    setShowAddForm(false);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowAddForm(true);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Product Dashboard</h2>

      <button
        onClick={() => {
          setEditingProduct(null);
          setShowAddForm(true);
        }}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        + Add Product
      </button>

      {showAddForm && (
        <AddProductForm
          existingProduct={editingProduct}
          onSuccess={handleAddSuccess}
        />
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded border">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2 border">Image</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Price</th>
              <th className="p-2 border">Stock</th>
              <th className="p-2 border">Category</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-2 border">
                  <img src={product.image} alt={product.name} className="h-12 w-12 object-cover" />
                </td>
                <td className="p-2 border">{product.name}</td>
                <td className="p-2 border">${product.price.toFixed(2)}</td>
                <td className="p-2 border">{product.stock}</td>
                <td className="p-2 border">{product.category}</td>
                <td className="p-2 border space-x-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-4 text-gray-500">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductTable;
