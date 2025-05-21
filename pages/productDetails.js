import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShoppingCartIcon, StarIcon, TruckIcon, ShieldIcon, ArrowLeftIcon } from 'lucide-react';
import { products } from '../utils/data';
import { useCart } from '../context/cartContext';
import Button from '../components/button';
import ProductGrid from '../components/productGrid';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const productId = parseInt(id, 10);
    if (!isNaN(productId)) {
      const foundProduct = products.find(p => p.id === productId);
      setProduct(foundProduct || null);
      if (foundProduct) {
        setActiveImage(foundProduct.image);
      }
    }
  }, [id]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      alert(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} to your cart.`);
    }
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link to="/products">
          <Button variant="primary">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  // Filter similar products (same category, excluding current product)
  const similarProducts = products
    .filter(p => product && p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-white w-full">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-indigo-600">Home</Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to="/products" className="hover:text-indigo-600">Products</Link>
              <span className="mx-2">/</span>
            </li>
            <li>
              <Link to={`/products?category=${product.category}`} className="hover:text-indigo-600">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-900 font-medium truncate">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 h-96">
              <img src={activeImage} alt={product.name} className="w-full h-full object-contain" />
            </div>
            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`border-2 rounded-md overflow-hidden h-24 ${activeImage === product.image ? 'border-indigo-500' : 'border-transparent'}`}
              >
                <img src={product.image} alt={`${product.name} thumbnail`} className="w-full h-full object-cover" />
              </button>
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="border-2 border-transparent rounded-md overflow-hidden h-24 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">View {i + 2}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              {product.new && (
                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-md mb-2">
                  NEW
                </span>
              )}
              {product.sale && (
                <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-md mb-2 ml-2">
                  SALE
                </span>
              )}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'stroke-current fill-none'}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">{product.rating} out of 5</span>
              </div>
              <div className="mb-6">
                {product.discountPrice ? (
                  <div className="flex items-center">
                    <span className="text-3xl font-bold text-gray-900">${product.discountPrice.toFixed(2)}</span>
                    <span className="ml-3 text-lg text-gray-500 line-through">${product.price.toFixed(2)}</span>
                    <span className="ml-3 text-sm font-medium text-red-600">
                      Save ${(product.price - product.discountPrice).toFixed(2)}
                    </span>
                  </div>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-900 mb-2">Description</h2>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="mr-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-1">
                    Quantity
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      type="button"
                      className="px-3 py-1 text-gray-600 hover:text-gray-700"
                      onClick={() => handleQuantityChange(quantity - 1)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      id="quantity"
                      name="quantity"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value, 10);
                        if (!isNaN(val) && val > 0) {
                          handleQuantityChange(val);
                        }
                      }}
                      className="w-12 text-center border-0 focus:ring-0"
                    />
                    <button
                      type="button"
                      className="px-3 py-1 text-gray-600 hover:text-gray-700"
                      onClick={() => handleQuantityChange(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-1">Availability</div>
                  {product.stock > 0 ? (
                    <div className="text-green-600 font-medium">In Stock ({product.stock} available)</div>
                  ) : (
                    <div className="text-red-600 font-medium">Out of Stock</div>
                  )}
                </div>
              </div>

              <div className="flex space-x-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg" className="flex-1">
                  Add to Wishlist
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex items-center">
                <TruckIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-700">Free shipping on orders over $50</span>
              </div>
              <div className="flex items-center">
                <ShieldIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-gray-700">2-year warranty included</span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
            <ProductGrid products={similarProducts} />
          </div>
        )}

        {/* Back to Products */}
        <div className="mt-12">
          <Link to="/products" className="inline-flex items-center text-indigo-600 hover:text-indigo-500">
            <ArrowLeftIcon className="h-4 w-4 mr-2" />
            Back to All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
