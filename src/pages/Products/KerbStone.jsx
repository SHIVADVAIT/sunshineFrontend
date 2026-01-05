import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaDumbbell, FaBolt, FaShieldAlt, FaDollarSign } from 'react-icons/fa';
import KerbStone1 from '../../assets/Product/KerbStone/KerbStone1.png';
import KerbStone2 from '../../assets/Product/KerbStone/KerbStone2.png';
import ProductQuoteModal from '../../components/ProductQuoteModal';

export default function KerbStone() {
  const navigate = useNavigate();
  const [expandedCards, setExpandedCards] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
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
  
  const products = [
    {
      id: 1,
      name: "Concrete Kerb Stone",
      price: "₹85.00",
      unit: "Piece",
      minOrder: "50 Pieces (MOQ)",
      image: KerbStone1,
      basicSpecs: {
        material: "Concrete",
        shape: "Straight",
        color: "Grey",
        size: "500 x 150 x 100 mm"
      },
      extendedSpecs: {
        businessType: "Manufacturer, Supplier",
        feature: "Durable, Weather Resistant",
        finishing: "Smooth",
        compressiveStrength: "25-30 MPa",
        application: "Road Construction"
      }
    },
    {
      id: 2,
      name: "Precast Kerb Stone",
      price: "₹90.00",
      unit: "Piece",
      minOrder: "50 Pieces (MOQ)",
      image: KerbStone2,
      basicSpecs: {
        material: "Precast Concrete",
        shape: "Curved & Straight",
        color: "Grey",
        size: "600 x 150 x 125 mm"
      },
      extendedSpecs: {
        businessType: "Manufacturer, Supplier",
        feature: "High Strength, Anti-Skid",
        finishing: "Textured",
        waterAbsorption: "5-8 %",
        tolerance: "±2 mm"
      }
    }
  ];

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
            <span className="text-red-400 font-medium">Kerb Stone</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-4 lg:py-6">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2 md:mb-3">
              Kerb Stone
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-4xl mx-auto leading-relaxed">
              Leading Manufacturer and Wholesaler of Concrete Kerb Stone, Precast Kerb Stone, Road Kerb Stone, Concrete Curbstone, Highway Kerb Stone and Street Kerb Stone from SunshineEnterprises.
            </p>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          {/* Main Content - Product Details */}
          <div className="lg:col-span-3">
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
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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

                      {/* Product Specifications */}
                      <div className="space-y-2">
                        <h3 className="text-xs sm:text-sm font-semibold text-gray-900 border-b border-gray-200 pb-1">
                          Specifications
                        </h3>
                        
                        <div className="space-y-1 min-h-[110px]">
                          {Object.entries(allSpecs).map(([key, value]) => (
                            <div key={key} className="grid grid-cols-5 gap-1 py-0.5 border-b border-gray-100">
                              <span className="col-span-2 text-xs sm:text-sm text-gray-600 font-medium capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}:
                              </span>
                              <span className="col-span-3 text-xs sm:text-sm text-gray-900 font-medium break-words">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* See More Button */}
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Products List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 sticky top-20">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                Products
              </h3>


              
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: "Paver Blocks", href: "paver-blocks", active: false },
                  { name: "Fly Ash Bricks", href: "fly-ash-bricks", active: false },
                  { name: "Precast Boundary Wall", href: "precast-boundary-wall", active: false },
                  { name: "Ccon Blocks", href: "ccon-blocks", active: false },
                  { name: "Kerb Stone", href: "kerb-stone", active: true },
                  { name: "Fencing Poles", href: "fencing-poles", active: false }
                ].map((product, index) => (
                  <div key={index} className="group">
                    <button 
                      onClick={() => handleNavigation(product.href)}
                      className={`w-full text-left block p-2 sm:p-3 rounded-lg transition-all duration-300 border ${
                        product.active 
                          ? 'bg-red-50 border-red-200 text-red-700 font-semibold' 
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm">
                          {product.name}
                        </span>
                        <svg 
                          className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 ${
                            product.active ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'
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
                
                <button className="w-full mt-4 sm:mt-6 bg-red-400 hover:bg-red-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-300">
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose Our Kerb Stones?
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-3xl mx-auto">
              Discover the advantages of our high-quality kerb stone solutions for road construction and infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: FaDumbbell,
                title: "High Strength",
                description: "Superior compressive strength ensures long-lasting performance under heavy traffic loads"
              },
              {
                icon: FaBolt,
                title: "Precision Manufacturing",
                description: "Accurate dimensions with minimal tolerance for perfect road edge alignment"
              },
              {
                icon: FaShieldAlt,
                title: "Weather Resistant",
                description: "Low water absorption and durable concrete composition withstand all weather conditions"
              },
              {
                icon: FaDollarSign,
                title: "Cost Effective",
                description: "Competitive pricing with flexible minimum order quantities for projects of all sizes"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-4 sm:p-6 rounded-xl bg-gray-50 hover:bg-red-50 transition-colors duration-300">
                <div className="text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4 text-red-400 flex justify-center">
                  <feature.icon />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-gray-50 py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
              Applications
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 max-w-2xl mx-auto">
              Our kerb stones are perfect for various road construction and infrastructure applications
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {[
              "Highway Construction",
              "City Roads", 
              "Parking Areas",
              "Walkways & Sidewalks",
              "Traffic Islands",
              "Garden Borders"
            ].map((application, index) => (
              <div key={index} className="bg-white p-3 sm:p-4 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-xs sm:text-sm font-medium text-gray-900">
                  {application}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
            Ready to Order Your Kerb Stones?
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mb-4 sm:mb-6 max-w-3xl mx-auto">
            Contact SunShine EnterPrises today for competitive pricing and reliable supply of high-quality kerb stones for your road construction projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button className="bg-white text-red-500 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-red-50 transition-colors duration-300 w-full sm:w-auto">
              Get Quote Now
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-white hover:text-red-500 transition-colors duration-300 w-full sm:w-auto">
              Call Us Today
            </button>
          </div>
        </div>
      </div>

      {/* Product Quote Modal */}
      <ProductQuoteModal
        showModal={showModal}
        selectedProduct={selectedProduct}
        onClose={closeModal}
      />

     </div>
  );
}

