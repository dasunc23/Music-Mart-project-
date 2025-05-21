import React from 'react';
import ProductCard from './productCard';

const ProductGrid = ({ products, title }) => {
  return (
    <div className="py-8">
      {title && <h2 className="text-2xl font-bold text-gray-800 mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
