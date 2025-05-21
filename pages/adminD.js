import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from '../components/productForm';
import ProductTable from '../components/productTable';
import { useAuth } from '../context/authContext';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get('/api/products');
    setProducts(res.data);
  };

  const handleAdd = async (productData) => {
    await axios.post('/api/products', productData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  const handleEdit = async (id, updatedProduct) => {
    await axios.put(`/api/products/${id}`, updatedProduct, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setEditingProduct(null);
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProducts();
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Product Dashboard</h1>
      <ProductForm onSubmit={handleAdd} />
      <ProductTable
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />
      {editingProduct && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Edit Product</h2>
          <ProductForm
            product={editingProduct}
            onSubmit={(data) => handleEdit(editingProduct.id, data)}
          />
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
