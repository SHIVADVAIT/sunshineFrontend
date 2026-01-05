import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductQuoteModal from './ProductQuoteModal';
import { GetProductByCategory } from '../services/GetProductByCategory';
import { GetAllProducts } from '../services/GetAllProducts';
import { transformProductData } from '../utils/productTransform';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function DynamicProductPage() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [expandedCards, setExpandedCards] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all categories for sidebar navigation
  const fetchAllCategories = async () => {
    try {
      const response = await GetAllProducts();
      
      if (response.data.success && response.data.data) {
        // Extract unique categories
        const categories = [...new Set(response.data.data.map(product => product.category_slug))]
          .map(slug => {
            const product = response.data.data.find(p => p.category_slug === slug);
            return {
              name: product.category_name,
              href: slug,
              slug: slug
            };
          })
          .sort((a, b) => a.name.localeCompare(b.name));
        
        setAvailableCategories(categories);
        console.log('Available Categories:', categories);
        
        // Find current category details
        const current = categories.find(cat => cat.slug === category);
        console.log('available',current)
        setCurrentCategory(current);
        
        return categories;
      }
      return [];
    } catch (err) {
      console.error('Error fetching categories:', err);
      return [];
    }
  };

  // Fetch products for current category
  const fetchProductsByCategory = async () => {
    try {
      setLoading(true);
      const response = await GetProductByCategory({ category });
      
      if (response.data.success && response.data.data) {
        const transformedProducts = response.data.data.map(transformProductData);
        setProducts(transformedProducts);
      } else {
        setProducts([]);
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError(`Failed to load products for ${currentCategory?.name || category}`);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Initialize categories and then fetch products
  useEffect(() => {
    const initializeData = async () => {
      const categories = await fetchAllCategories();
      const current = categories.find(cat => cat.slug === category);
      console.log("this is current Categoreis", categories); 
      console.log('this is current ', current);
      
      
      if (current) {
        setCurrentCategory(current);
        await fetchProductsByCategory();
      } else {
navigate('/');  
         setLoading(false);
      }
    };

    initializeData();
  }, []);

  // Fetch products when category changes
  useEffect(() => {
    if (currentCategory && category !== currentCategory.slug) {
      const newCategory = availableCategories.find(cat => cat.slug === category);
      if (newCategory) {
        setCurrentCategory(newCategory);
        fetchProductsByCategory();
      } else {
        setError('Category not found');
        setLoading(false);
      }
    } else if (currentCategory && category === currentCategory.slug) {
      fetchProductsByCategory();
    }
  }, [category, currentCategory]);

  const toggleCardExpansion = (productId) => {
    setExpandedCards(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleNavigation = (href) => {
    navigate(`/${href}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-400"></div>
          <p className="mt-4 text-gray-600">Loading {currentCategory?.name || 'products'}...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <nav className="text-xs sm:text-sm text-gray-500">
            <button onClick={() => navigate('/')} className="hover:text-red-400 transition-colors">
              Home
            </button>
            <span className="mx-1 sm:mx-2">/</span>
            <button onClick={() => navigate('/products')} className="hover:text-red-400 transition-colors">
              Products
            </button>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-red-400 font-medium">{currentCategory?.name || 'Products'}</span>
          </nav>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Main Content - Product Details */}
          <div className="lg:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No {currentCategory?.name?.toLowerCase() || 'products'} available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                {products.map((product) => {
                  const isExpanded = expandedCards[product.id];
                  const allSpecs = { ...product.basicSpecs, ...(isExpanded ? product.extendedSpecs : {}) };
                  
                  return (
                    <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 h-fit">
                      {/* Product Header */}
                      <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-3 sm:p-4">
                        <h2 className="text-xs sm:text-sm font-bold text-gray-900 mb-2">
                          {product.name}
                        </h2>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <span className="text-xs sm:text-sm font-bold text-red-400">
                              {product.price}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-600">
                              {product.unit}
                            </span>
                          </div>
                          <div className="text-xs sm:text-sm text-gray-700 bg-gray-200 px-2 py-1 rounded-full">
                            {product.minOrder}
                          </div>
                        </div>
                      </div>

                      {/* Product Content */}
                      <div className="p-3 sm:p-4">
                        {/* Product Image */}
                        <div className="relative mb-4">
                          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden group">
                            <img
                              src={`${API_BASE}${product.image}`}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.src = '/assets/Product/placeholder.png';
                              }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          </div>
                          
                          {/* Get Best Price Button */}
                          <button 
                            onClick={() => openModal(product)}
                            className="absolute bottom-2 left-2 right-2 bg-red-400 hover:bg-red-500 text-white py-1.5 px-2 rounded-md font-semibold text-xs sm:text-sm transition-colors duration-300 shadow-lg"
                          >
                            Get Best Price
                          </button>
                        </div>

                        {/* Product Description */}
                        {product.description && (
                          <div className="mb-4">
                            <p className="text-xs sm:text-sm text-gray-600">{product.description}</p>
                          </div>
                        )}

                        {/* Product Specifications */}
                        <div className="space-y-2">
                          <h3 className="text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200 pb-1">
                            Specifications
                          </h3>
                          
                          <div className="space-y-1 min-h-[110px]">
                            {Object.entries(allSpecs).map(([key, value]) => (
                              <div key={key} className="grid grid-cols-5 gap-1 py-0.5 border-b border-gray-100">
                                <span className="col-span-2 text-xs sm:text-sm text-gray-600 font-medium">
                                  {key}:
                                </span>
                                <span className="col-span-3 text-xs sm:text-sm text-gray-900 font-medium break-words">
                                  {typeof value === "object" && value !== null
                                    ? value.String || JSON.stringify(value)
                                    : value}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* See More Button */}
                          {Object.keys(product.extendedSpecs).length > 0 && (
                            <button
                              onClick={() => toggleCardExpansion(product.id)}
                              className="w-full mt-0 text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium flex items-center justify-center transition-colors duration-300 py-0"
                            >
                              {isExpanded ? 'See Less' : 'See More'}
                              <svg 
                                className={`w-3 h-3 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                                fill="currentColor" 
                                viewBox="0 0 20 20"
                              >
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar - Products List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-20">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                Products
              </h3>
              
              <div className="space-y-2 sm:space-y-3">
                {availableCategories.map((productCategory, index) => (
                  <div key={index} className="group">
                    <button 
                      onClick={() => handleNavigation(productCategory.href)}
                      className={`w-full text-left block p-2 sm:p-3 rounded-lg transition-all duration-300 border ${
                        productCategory.slug === category
                          ? 'bg-red-50 border-red-200 text-red-700 font-semibold' 
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm">
                          {productCategory.name}
                        </span>
                        <svg 
                          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                            productCategory.slug === category ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'
                          }`} 
                          fill="currentColor" 
                          viewBox="0 0 20 20"
                        >
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </button>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-3 sm:mb-4">
                  Contact Us
                </h4>
                <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
                  <div>
                    <p className="font-medium text-gray-900">SunShine EnterPrises</p>
                  </div>
                  <div>
                    <p>Durga Mandir Road, Shivdayal Nagar</p>
                    <p>Near Durga Mandir Ramnagar,</p>
                    <p>Hazaribagh, Jharkhand - 825301,</p>
                    <p>India</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full mt-4 sm:mt-6 bg-red-400 hover:bg-red-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-300"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Quote Modal */}
      <ProductQuoteModal
        showModal={showModal}
        selectedProduct={selectedProduct}
        onClose={closeModal}
        style={{ zIndex: 9999, position: 'fixed' }}
      />
    </div>
  );
}
