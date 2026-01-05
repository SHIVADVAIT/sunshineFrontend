import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Import product images
import PaverBlock from '../assets/Product/PaverBlocks/PaverBlocks1.png';
import FlyAshBrick from '../assets/Product/FlyAshBricks/FlyAshBrick1.png';
import CconBlock from '../assets/Product/CconBlocks/CconBlocks1.png';
import KerbStone from '../assets/Product/KerbStone/KerbStone1.png';
import FencingPole from '../assets/Product/FencingPoles/FencingPoles1.png';
import PreCast from '../assets/Product/PreCastBoundaryWall/PreCast1.png';

export default function Carousel() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Add custom styles for animations
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeInScale {
        0% {
          opacity: 0;
          transform: scale(0.8) translateY(20px);
        }
        50% {
          opacity: 0.8;
          transform: scale(0.95) translateY(10px);
        }
        100% {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-10px);
        }
      }
      
      @keyframes shimmer {
        0% {
          background-position: -200% 0;
        }
        100% {
          background-position: 200% 0;
        }
      }
      
      .animate-fadeInScale {
        animation: fadeInScale 0.8s ease-out;
      }
      
      .animate-float {
        animation: float 3s ease-in-out infinite;
      }
      
      .animate-shimmer {
        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
        background-size: 200% 100%;
        animation: shimmer 2s infinite;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const slides = [
    {
      id: 1,
      title: "Premium Paver Blocks",
      subtitle: "Durable & Non-Slip",
      description: "High-quality interlocking paver blocks perfect for driveways, pathways, and landscaping projects with superior weather resistance.",
      image: PaverBlock,
      buttonText: "Explore Paver Blocks",
      buttonAction: () => navigate('/paver-blocks'),
      bgGradient: "from-red-400 to-red-500"
    },
   
    {
      id: 3,
      title: "Strong Ccon Blocks",
      subtitle: "Fire Resistant & Lightweight",
      description: "Advanced lightweight concrete blocks with excellent thermal insulation and fire resistance for modern construction needs.",
      image: CconBlock,
      buttonText: "Discover Ccon Blocks",
      buttonAction: () => navigate('/ccon-blocks'),
      bgGradient: "from-red-400 to-red-500"
    },
    {
      id: 4,
      title: "Precision Kerb Stones",
      subtitle: "Road Infrastructure",
      description: "High-precision manufactured kerb stones designed for road construction and urban infrastructure development projects.",
      image: KerbStone,
      buttonText: "Check Kerb Stones",
      buttonAction: () => navigate('/kerb-stone'),
      bgGradient: "from-red-400 to-red-500"
    },
    {
      id: 5,
      title: "Durable Fencing Poles",
      subtitle: "Security & Boundary",
      description: "Strong and weather-resistant RCC fencing poles ideal for security applications and boundary demarcation.",
      image: FencingPole,
      buttonText: "View Fencing Poles",
      buttonAction: () => navigate('/fencing-poles'),
      bgGradient: "from-red-400 to-red-500"
    },
    {
      id: 6,
      title: "Precast Boundary Walls",
      subtitle: "Quick Installation",
      description: "Ready-to-install precast concrete boundary walls offering durability, cost-effectiveness, and rapid installation.",
      image: PreCast,
      buttonText: "Explore Boundary Walls",
      buttonAction: () => navigate('/precast-boundary-wall'),
      bgGradient: "from-red-400 to-red-500"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlay && !isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000); // 5 seconds

      return () => clearInterval(interval);
    }
  }, [isAutoPlay, isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <div 
      className="relative w-full h-[300px] sm:h-[400px] md:h-[400px] lg:h-[400px] xl:h-[400px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides Container */}
      <div 
        className="flex transition-all duration-1000 ease-in-out h-full transform"
        style={{ 
          transform: `translateX(-${currentSlide * 100}%)`,
          filter: 'brightness(1.1) contrast(1.05)'
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`min-w-full h-full relative bg-gradient-to-br ${slide.bgGradient} flex items-center justify-center overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-white bg-opacity-5" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.1'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            
            {/* Full Width Image Container */}
            <div className="absolute inset-0 w-full h-full">
              {/* Product Image - Full Screen Coverage */}
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover transition-all duration-1000 ${index === currentSlide ? 'animate-fadeInScale scale-105' : 'opacity-0 scale-100'}`}
                  style={{
                    filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.3)) saturate(1.2) brightness(1.1)',
                    objectPosition: 'center center'
                  }}
                />
                
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 animate-shimmer opacity-10"></div>
                
                {/* Floating Light Effects */}
                {/* <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-4 right-4 sm:top-8 sm:right-8 w-3 h-3 sm:w-4 sm:h-4 bg-white bg-opacity-60 rounded-full animate-ping" style={{ animationDelay: '0.5s', animationDuration: '2s' }}></div>
                  <div className="absolute bottom-8 left-8 sm:bottom-12 sm:left-12 w-2 h-2 sm:w-3 sm:h-3 bg-white bg-opacity-40 rounded-full animate-ping" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
                  <div className="absolute top-1/3 left-4 sm:left-8 w-1 h-1 sm:w-2 sm:h-2 bg-white bg-opacity-80 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '4s' }}></div>
                  <div className="absolute top-2/3 right-8 sm:right-16 w-2 h-2 sm:w-3 sm:h-3 bg-white bg-opacity-50 rounded-full animate-pulse" style={{ animationDelay: '3s', animationDuration: '2.5s' }}></div>
                </div> */}
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12">
                <div className="text-center text-white z-10 max-w-4xl mx-auto">
                  {/* Product Title */}
                  <h2 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 sm:mb-4 drop-shadow-2xl animate-fadeInScale">
                    {slide.title}
                  </h2>
                  
                  {/* Subtitle */}
                  <p className="text-sm sm:text-lg md:text-xl lg:text-xl xl:text-2xl font-medium mb-3 sm:mb-6 drop-shadow-lg opacity-90">
                    {slide.subtitle}
                  </p>
                  
                  {/* Description */}
                  {/* <p className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl mb-4 sm:mb-8 drop-shadow-lg opacity-80 max-w-2xl mx-auto leading-relaxed">
                    {slide.description}
                  </p> */}
                  
                  {/* CTA Button */}
                  {/* <button
                    onClick={slide.buttonAction}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full text-xs sm:text-sm md:text-base mt-[12px] lg:text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-2xl border-2 border-white border-opacity-30 backdrop-blur-sm animate-float"
                  >
                    {slide.buttonText}
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-6 md:px-10 pointer-events-none z-20">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 sm:p-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:-translate-x-1 pointer-events-auto shadow-2xl border border-white border-opacity-30 backdrop-blur-sm group"
          aria-label="Previous slide"
        >
          <FaChevronLeft className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:-translate-x-0.5" />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="bg-red-500 bg-opacity-80 hover:bg-opacity-100 text-white p-3 sm:p-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:translate-x-1 pointer-events-auto shadow-2xl border border-white border-opacity-30 backdrop-blur-sm group"
          aria-label="Next slide"
        >
          <FaChevronRight className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 sm:space-x-6 z-20">
        {/* Slide Indicators */}
        <div className="flex space-x-2 sm:space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 sm:h-4 rounded-full transition-all duration-500 transform hover:scale-125 ${
                index === currentSlide
                  ? 'bg-white scale-125 w-8 sm:w-10 shadow-lg'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75 w-3 sm:w-4'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 sm:h-2 bg-black bg-opacity-30">
        <div
          className="h-full bg-gradient-to-r from-red-400 to-red-600 transition-all duration-500 ease-out relative overflow-hidden"
          style={{ 
            width: `${((currentSlide + 1) / slides.length) * 100}%` 
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-pulse"></div>
        </div>
      </div>

      {/* Slide Counter */}
      {/* <div className="absolute top-4 sm:top-6 right-4 sm:right-6 bg-black bg-opacity-50 text-white px-3 py-2 sm:px-4 sm:py-3 rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm border border-white border-opacity-20 transition-all duration-300 hover:bg-opacity-70 z-20">
        <span className="font-bold text-red-300">{currentSlide + 1}</span>
        <span className="mx-1 opacity-60">/</span>
        <span className="opacity-80">{slides.length}</span>
      </div> */}
    </div>
  );
}
