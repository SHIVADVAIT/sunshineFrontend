import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBuilding, FaTools, FaLeaf, FaRoad, FaTh, FaShieldAlt } from 'react-icons/fa';

// Import Product Images
import CconBlockImg from '../assets/Product/CconBlocks/CconBlocks1.png';
import FencingPoleImg from '../assets/Product/FencingPoles/FencingPoles1.png';
import FlyAshBrickImg from '../assets/Product/FlyAshBricks/FlyAshBrick1.png';
import KerbStoneImg from '../assets/Product/KerbStone/KerbStone1.png';
import PaverBlockImg from '../assets/Product/PaverBlocks/PaverBlocks1.png';
import PreCastImg from '../assets/Product/PreCastBoundaryWall/PreCast1.png';

export default function Product() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(`/${path}`);
  };

  const productCategories = [
    {
      id: 1,
      name: "CconBlocks",
      slug: "ccon-blocks",
      description: "Lightweight concrete blocks with excellent thermal insulation and fire resistance properties.",
      image: CconBlockImg,
      icon: FaBuilding,
      features: ["Fire Resistant", "Thermal Insulation", "Lightweight", "Eco-Friendly"],
      basePrice: "₹42.00",
      unit: "Per Piece"
    },
    {
      id: 2,
      name: "Fencing Poles",
      slug: "fencing-poles",
      description: "Strong and durable RCC fencing poles for security and boundary applications.",
      image: FencingPoleImg,
      icon: FaTools,
      features: ["Weather Resistant", "High Strength", "Easy Installation", "Long Lasting"],
      basePrice: "₹285.00",
      unit: "Per Piece"
    },
    {
      id: 3,
      name: "Fly Ash Bricks",
      slug: "flyash-bricks",
      description: "Eco-friendly and lightweight bricks made from fly ash for sustainable construction.",
      image: FlyAshBrickImg,
      icon: FaLeaf,
      features: ["Eco-Friendly", "High Strength", "Uniform Size", "Fire Resistant"],
      basePrice: "₹6.50",
      unit: "Per Piece"
    },
    {
      id: 4,
      name: "Kerb Stones",
      slug: "kerb-stone",
      description: "Precision-manufactured kerb stones for road construction and infrastructure projects.",
      image: KerbStoneImg,
      icon: FaRoad,
      features: ["High Precision", "Weather Resistant", "Heavy Duty", "Easy Installation"],
      basePrice: "₹125.00",
      unit: "Per Running Meter"
    },
    {
      id: 5,
      name: "Paver Blocks",
      slug: "paver-blocks",
      description: "High-quality interlocking paver blocks for driveways, pathways, and landscaping projects.",
      image: PaverBlockImg,
      icon: FaTh,
      features: ["Interlocking Design", "Non-Slip Surface", "Easy Maintenance", "Versatile Application"],
      basePrice: "₹45.00",
      unit: "Per Square Meter"
    },
    {
      id: 6,
      name: "Precast Boundary Wall",
      slug: "precast-boundary-wall",
      description: "Install precast concrete boundary walls for residential and commercial properties.",
      image: PreCastImg,
      icon: FaShieldAlt,
      features: ["Quick Installation", "Durable", "Cost Effective", "Weather Resistant"],
      basePrice: "₹115.00",
      unit: "Square Feet"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <nav className="text-xs sm:text-sm text-gray-500">
            <button onClick={() => navigate('/')} className="hover:text-red-400 transition-colors">
              Home
            </button>
            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-red-400 font-medium">Products</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          <div className="text-center">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 md:mb-4">
              Our Premium Products
            </h1>
            <p className="text-xs sm:text-sm text-red-100 max-w-4xl mx-auto leading-relaxed">
              Discover our comprehensive range of high-quality construction materials designed for modern building needs. 
              From eco-friendly fly ash bricks to durable precast boundary walls, we have everything for your construction project.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-8 lg:py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {productCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative overflow-hidden">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-red-400 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                  Starting {category.basePrice}
                </div>
              </div>
              
              <div className="p-4 sm:p-6">
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                    <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {category.unit}
                    </p>
                  </div>
                </div>
                
                <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                  {category.description}
                </p>
                
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-4 sm:mb-6">
                  {category.features.map((feature, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 sm:px-3 py-1 rounded-full text-xs font-medium">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => handleNavigation(category.slug)}
                  className="w-full bg-red-400 hover:bg-red-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-300"
                >
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-red-400 to-red-500 text-white py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 text-center">
          <h2 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
            Need Custom Solutions?
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mb-4 sm:mb-6 max-w-3xl mx-auto">
            Contact our experts for customized product solutions tailored to your specific construction requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white text-red-500 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-red-50 transition-colors duration-300 w-full sm:w-auto"
            >
              Get Quote Now
            </button>
            <button 
              onClick={() => window.open('tel:+91-7905354305', '_self')}
              className="border-2 border-white text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-white hover:text-red-500 transition-colors duration-300 w-full sm:w-auto"
            >
              Call: +91-7905354305
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
