import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FilterIcon, SlidersIcon } from 'lucide-react';
import ProductGrid from '../components/productGrid';
import { products, categories } from '../utils/data';
import Button from '../components/button';

const Products = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [priceRange, setPriceRange] = useState({
    min: 0,
    max: 3000,
  });
  const [showFilters, setShowFilters] = useState(false);

  // Apply filters based on URL parameters and selected filters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const saleParam = searchParams.get('sale');
    const newParam = searchParams.get('new');

    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }

    let filtered = [...products];

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => product.price >= priceRange.min && product.price <= priceRange.max);

    // Filter by sale items
    if (saleParam === 'true') {
      filtered = filtered.filter(product => product.sale);
    }

    // Filter by new items
    if (newParam === 'true') {
      filtered = filtered.filter(product => product.new);
    }

    setFilteredProducts(filtered);
  }, [searchParams, selectedCategory, priceRange]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handlePriceChange = (type, value) => {
    setPriceRange(prev => ({
      ...prev,
      [type]: value,
    }));
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange({
      min: 0,
      max: 3000,
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen w-full">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Musical Instruments
        </h1>
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button variant="secondary" onClick={() => setShowFilters(!showFilters)} className="flex items-center">
            <FilterIcon className="h-4 w-4 mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row">
          {/* Filters Sidebar */}
          <div className={`w-full md:w-64 md:block ${showFilters ? 'block' : 'hidden'} md:mr-8`}>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold flex items-center">
                  <SlidersIcon className="h-5 w-5 mr-2" />
                  Filters
                </h2>
                <button onClick={clearFilters} className="text-sm text-indigo-600 hover:text-indigo-800">
                  Clear all
                </button>
              </div>
              {/* Categories */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      id="all-categories"
                      type="radio"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => handleCategoryChange(null)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="all-categories" className="ml-2 text-gray-700">
                      All Categories
                    </label>
                  </div>
                  {categories.map(category => (
                    <div key={category.id} className="flex items-center">
                      <input
                        id={`category-${category.id}`}
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => handleCategoryChange(category.id)}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`category-${category.id}`} className="ml-2 text-gray-700">
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Price Range */}
              <div>
                <h3 className="font-medium mb-3">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="min-price" className="block text-sm text-gray-600 mb-1">
                      Min Price: ${priceRange.min}
                    </label>
                    <input
                      type="range"
                      id="min-price"
                      min="0"
                      max="2000"
                      step="100"
                      value={priceRange.min}
                      onChange={e => handlePriceChange('min', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="block text-sm text-gray-600 mb-1">
                      Max Price: ${priceRange.max}
                    </label>
                    <input
                      type="range"
                      id="max-price"
                      min="100"
                      max="3000"
                      step="100"
                      value={priceRange.max}
                      onChange={e => handlePriceChange('max', parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Product Listing */}
          <div className="flex-1">
            {/* Results info */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
              <p className="text-gray-700">
                Showing{' '}
                <span className="font-medium">{filteredProducts.length}</span>{' '}
                results
              </p>
              <div className="flex items-center">
                <span className="text-gray-600 mr-2">Sort by:</span>
                <select className="border-gray-300 rounded-md text-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                  <option>Best Selling</option>
                </select>
              </div>
            </div>
            {filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or browse our categories
                </p>
                <Button variant="primary" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
