import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from '../components/Carousel';
import FencingPole from '../assets/Product/FencingPoles/FencingPoles1.png'
import FlyAshBrick from '../assets/Product/FlyAshBricks/FlyAshBrick1.png'
import PaverBlock from '../assets/Product/PaverBlocks/PaverBlocks1.png'
import CconBlock from  '../assets/Product/CconBlocks/CconBlocks1.png'
import KerbStone from '../assets/Product/KerbStone/KerbStone1.png'

// React Icons imports
import { 
  FaTrophy, 
  FaBoxOpen, 
  FaSmile, 
  FaGlobeAmericas,
  FaIndustry,
  FaLeaf,
  FaBolt,
  FaDollarSign,
  FaPhoneAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaWhatsapp
} from 'react-icons/fa';



export default function HomePage() {
  const navigate = useNavigate();

  const handleEnquiryClick = () => {
    navigate('/contact');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/917905354305?text=Hello, I would like to enquire about your products from SunShine Enterprises', '_blank');
  };

  const products = [
    {
      id: 1,
      name: "Paver Blocks",
      description: "High-quality interlocking paver blocks for driveways, pathways, and landscaping projects.",
      image: PaverBlock,
      features: ["Durable", "Non-Slip", "Weather Resistant"],
      href: "/paver-blocks"
    },
    {
      id: 2,
      name: "Fly Ash Bricks",
      description: "Eco-friendly and lightweight bricks made from fly ash for sustainable construction.",
      image: FlyAshBrick,
      features: ["Eco-Friendly", "Lightweight", "High Strength"],
      href: "/fly-ash-bricks"
    },
    {
      id: 3,
      name: "Precast Boundary Wall",
      description: "Install precast concrete boundary walls for residential and commercial properties.",
      image: "/src/assets/Product/PreCastBoundaryWall/PreCast1.png",
      features: ["Quick Installation", "Durable", "Cost Effective"],
      href: "/precast-boundary-wall"
    },
    {
      id: 4,
      name: "Ccon Blocks",
      description: "Lightweight concrete blocks with excellent thermal insulation and fire resistance.",
      image: CconBlock,
      features: ["Fire Resistant", "Thermal Insulation", "Lightweight",
      ],
      href: "/ccon-blocks"
    },
    {
      id: 5,
      name: "Kerb Stone",
      description: "Precision-manufactured kerb stones for road construction and infrastructure projects.",
      image: KerbStone,
      features: ["High Precision", "Weather Resistant", "Durable"],
      href: "/kerb-stone"
    },
    {
      id: 6,
      name: "Fencing Poles",
      description: "Strong and durable RCC fencing poles for security and boundary applications.",
      image: FencingPole,
      features: ["High Strength", "Weather Resistant", "Easy Handle"],
      href: "/fencing-poles"
    }
  ];

  const companyStats = [
    { label: "Years of Experience", value: "15+", icon: FaTrophy },
    { label: "Products Delivered", value: "10,000+", icon: FaBoxOpen },
    { label: "Happy Customers", value: "5,000+", icon: FaSmile },
    { label: "Cities Served", value: "50+", icon: FaGlobeAmericas }
  ];

  const whyChooseUs = [
    {
      icon: FaIndustry,
      title: "Manufacturing Excellence",
      description: "State-of-the-art manufacturing facilities with quality control at every stage"
    },
    {
      icon: FaLeaf,
      title: "Eco-Friendly Products",
      description: "Sustainable manufacturing practices and eco-friendly product range"
    },
    {
      icon: FaBolt,
      title: "Quick Delivery",
      description: "Fast and reliable delivery services across multiple cities"
    },
    {
      icon: FaDollarSign,
      title: "Competitive Pricing",
      description: "Best-in-market pricing with no compromise on quality"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
            <Carousel />

      {/* Hero Section */}
      <section className="bg-white-300  text-black-800 relative overflow-hidden">
         <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4 sm:space-y-6 lg:space-y-8">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold leading-tight">
                Leading Manufacturer of 
                <span className="block text-red-400">Premium Cement Products</span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-black-700 leading-relaxed text-justify max-w-2xl">
                SunShine Enterprises has been trusted name in manufacturing high-quality cement products since 2009. 
                We specialize in Paver Blocks, Fly Ash Bricks,  Boundary Walls, and more.
              </p>
              {/* <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <button className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300 shadow-lg">
                  Explore Products
                </button>
                <button className=" bg-red-400 hover:bg-red-500 text-blue   px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-colors duration-300">
                  Get Quote
                </button>
              </div> */}
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-3 sm:space-y-4">
                  <img src={PaverBlock} alt="Paver Blocks" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                  <img src={CconBlock} alt="Ccon Blocks" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="space-y-3 sm:space-y-4 pt-6 sm:pt-8">
                  <img src={FlyAshBrick} alt="Fly Ash Bricks" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                  <img src={FencingPole} alt="Fencing Poles" className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Company Stats */}
      <section className="py-6 sm:py-8 lg:py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center p-4 sm:p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="text-lg sm:text-xl lg:text-2xl mb-2 sm:mb-3 text-red-400 flex justify-center">
                  <stat.icon />
                </div>
                <div className="text-sm sm:text-base lg:text-lg font-bold text-red-400 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

   

      {/* Company Information */}
       

      {/* Company Details */}
      

      {/* Why Choose Us */}
      <section className="py-3 sm:py-4 lg:py-6 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-4 sm:mb-6 lg:mb-8">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">
              Why Choose SunShine Enterprises?
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the difference with our commitment to quality, innovation, and customer satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="text-center p-2 sm:p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300">
                <div className="text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 text-red-400 flex justify-center">
                  <item.icon />
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-900 mb-3 sm:mb-4">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Enquiry Button */}


    {      /* Enquiry Buttons */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Main Enquiry Button */}
        <div className="relative group">
          <button
            onClick={handleEnquiryClick}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white p-2.5 md:p-3.5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center relative overflow-hidden"
            title="Make an Enquiry"
          >
            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            
            {/* Icon */}
            <div className="relative z-10 flex items-center">
              <FaEnvelope className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            
            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-red-300 opacity-60 animate-ping"></div>
          </button>
          
          {/* Professional Tooltip */}
          <div className="absolute bottom-full right-0 mb-4 px-4 py-3 bg-gray-900 text-white text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center space-x-2">
              <FaQuestionCircle className="w-3 h-3 text-blue-300" />
              <span className="font-medium text-xs sm:text-sm">Get Professional Quote</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-300 mt-1">Click to contact our experts</div>

            {/* Arrow */}
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
      
      {/* WhatsApp Button */}
       <div className="fixed bottom-6 left-6 z-50">
        {/* WhatsApp Button */}
        <div className="relative group">
          <button
            onClick={handleWhatsAppClick}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 md:p-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center relative overflow-hidden"
            title="WhatsApp Enquiry"
          >
            {/* Ripple Effect */}
            <div className="absolute inset-0 rounded-full bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
            
            {/* Icon */}
            <div className="relative z-10 flex items-center">
              <FaWhatsapp className="w-6 h-6 md:w-7 md:h-7" />
            </div>
            
            {/* Pulsing Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-green-300 opacity-60 animate-ping"></div>
          </button>
          
          {/* Professional Tooltip */}
          <div className="absolute bottom-full left-0 mb-4 px-4 py-3 bg-gray-900 text-white text-xs sm:text-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap shadow-xl transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center space-x-2">
              <FaWhatsapp className="w-3 h-3 text-green-300" />
              <span className="font-medium">Chat on WhatsApp</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-300 mt-1">Get instant support via WhatsApp</div>
            
            {/* Arrow */}
            <div className="absolute top-full left-6 w-0 h-0 border-l-4 border-r-4 border-t-6 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
      

      {/* Call to Action */}
      

    </div>
  )
}