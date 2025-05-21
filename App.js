import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { CartProvider } from './context/cartContext';
import { AuthProvider, useAuth } from './context/authContext';

import Navbar from './components/navbar';
import Footer from './components/footer';

import Home from './pages/homePage';
import Products from './pages/productsPage';
import ProductDetail from './pages/productDetails';
import Cart from './pages/cartPage';
import Checkout from './pages/checkoutPgae';
import Payment from './pages/paymentPage';
import Profile from './pages/profilePage';
import LoginPage from './pages/loginPage';

import AdminDashboard from './pages/adminD';
import AddProductForm from './components/productForm'; // ✅ Import the Add Product component
import RegisterPage from './pages/register';




// Layout & Route Wrapper
function AppContent() {
  const location = useLocation();
  const { isAdmin } = useAuth();

  const hideLayout = [location.pathname === '/login','/register'];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {!hideLayout && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/register" element={<RegisterPage />} />
      

          {/* ✅ Admin Protected Routes */}
          <Route
            path="/admin"
            element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/admin/add-product"
            element={isAdmin ? <AddProductForm /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
}

// App wrapper with context providers
function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
