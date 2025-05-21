import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from 'lucide-react';
import ProductGrid from '../components/productGrid';
import { featuredProducts, categories } from '../utils/data';
import Button from '../components/button';

const Home = () => {
  return (
    <div className="bg-white w-full">
      {/* Hero Section */}
      <section
        className="bg-cover bg-center h-[500px] flex items-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80')",
          backgroundPosition: 'center 30%'
        }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-xl bg-white bg-opacity-90 p-8 rounded-lg">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Find Your Perfect Sound</h1>
            <p className="text-lg text-gray-700 mb-6">
              Discover premium musical instruments for every level of musician. From guitars and drums to keyboards and recording gear.
            </p>
            <div className="flex space-x-4">
              <Link to="/products">
                <Button variant="primary" size="lg">Shop Now</Button>
              </Link>
              <Link to="/products?sale=true">
                <Button variant="outline" size="lg">View Deals</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(category => (
              <Link key={category.id} to={`/products?category=${category.id}`} className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform group-hover:shadow-md group-hover:-translate-y-1">
                  <img src={category.image} alt={category.name} className="w-full h-32 object-cover" />
                  <div className="p-4 text-center">
                    <h3 className="font-medium text-gray-900">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Instruments</h2>
            <Link to="/products" className="text-indigo-600 font-medium flex items-center hover:text-indigo-500">
              View All
              <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
        </div>
      </section>

      {/* Sale Banner */}
      <section className="bg-indigo-700 py-12 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2">Summer Sale</h2>
              <p className="text-indigo-200 text-lg">Save up to 40% on select instruments</p>
            </div>
            <Link to="/products?sale=true">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-indigo-700">
                Shop the Sale
              </Button>
            </Link>
          </div>
        </div>
      </section>

        {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose MusicMart
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-600">
                All our instruments are carefully selected to ensure the highest
                quality standards.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
              <p className="text-gray-600">
                Not satisfied? Return your purchase within 30 days for a full
                refund.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="h-8 w-8 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Support</h3>
              <p className="text-gray-600">
                Our team of musicians is here to help you find the perfect
                instrument.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-3">Join Our Newsletter</h2>
          <p className="text-gray-300 mb-6 text-lg">Subscribe to get special offers, free giveaways, and product launches.</p>
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto">
            <input type="email" placeholder="Your email address" className="flex-grow px-4 py-3 rounded-l sm:rounded-r-none mb-2 sm:mb-0 text-gray-900" />
            <Button variant="primary" size="lg" className="sm:rounded-l-none">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
