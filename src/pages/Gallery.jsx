import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand } from 'react-icons/fa';
import AppLayout from '../components/AppLayout';

// Import Product Images
import CconBlock1 from '../assets/Product/CconBlocks/CconBlocks1.png';
import CconBlock2 from '../assets/Product/CconBlocks/CconBlocks2.png';
import FlyAshBrick1 from '../assets/Product/FlyAshBricks/FlyAshBrick1.png';
import FlyAshBrick2 from '../assets/Product/FlyAshBricks/FlyAshBrick2.png';
import FencingPole1 from '../assets/Product/FencingPoles/FencingPoles1.png';
import FencingPole2 from '../assets/Product/FencingPoles/FencingPoles2.png';
import KerbStone1 from '../assets/Product/KerbStone/KerbStone1.png';
import KerbStone2 from '../assets/Product/KerbStone/KerbStone2.png';
import PaverBlock1 from '../assets/Product/PaverBlocks/PaverBlocks1.png';
import PaverBlock2 from '../assets/Product/PaverBlocks/PaverBlocks2.png';
import PreCast1 from '../assets/Product/PreCastBoundaryWall/PreCast1.png';
import PreCast2 from '../assets/Product/PreCastBoundaryWall/PreCast2.png';

// Import Project Images
import KiranMedical from '../assets/Product/ProjectOne/KiranMedical.png';
import KiranMedicalCollege from '../assets/Product/ProjectOne/KiranMedicalCollege.png';
import KiranMedicalRoadCurving from '../assets/Product/ProjectOne/KiranMedicalRoadCurving.png';

// Import Team Images
import ManagingDirector from '../assets/Team/ManagingDirector.jpg';
import GroupPhoto from '../assets/Team/GroupPhoto.png';
import Director1 from '../assets/Team/Director1.png';
import Director2 from '../assets/Team/Director2.png';
import Director3 from '../assets/Team/Director3.png';
import Director4 from '../assets/Team/Director4.jpg';
import Chairman from '../assets/Team/Chairmain.jpg';

export default function Gallery() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const galleryData = [
    // Products
    {
      id: 1,
      src: CconBlock1,
      alt: "CconBlocks - High Quality Construction Material",
      category: "products",
      title: "CconBlocks Type 1"
    },
    {
      id: 2,
      src: CconBlock2,
      alt: "CconBlocks - Durable Building Material",
      category: "products",
      title: "CconBlocks Type 2"
    },
    {
      id: 3,
      src: FlyAshBrick1,
      alt: "Fly Ash Bricks - Eco-Friendly Building Solution",
      category: "products",
      title: "Fly Ash Bricks Type 1"
    },
    {
      id: 4,
      src: FlyAshBrick2,
      alt: "Fly Ash Bricks - Sustainable Construction Material",
      category: "products",
      title: "Fly Ash Bricks Type 2"
    },
    {
      id: 5,
      src: FencingPole1,
      alt: "Fencing Poles - Strong and Durable",
      category: "products",
      title: "Fencing Poles Type 1"
    },
    {
      id: 6,
      src: FencingPole2,
      alt: "Fencing Poles - Premium Quality",
      category: "products",
      title: "Fencing Poles Type 2"
    },
    {
      id: 7,
      src: KerbStone1,
      alt: "Kerb Stone - Road Infrastructure",
      category: "products",
      title: "Kerb Stone Type 1"
    },
    {
      id: 8,
      src: KerbStone2,
      alt: "Kerb Stone - Urban Development",
      category: "products",
      title: "Kerb Stone Type 2"
    },
    {
      id: 9,
      src: PaverBlock1,
      alt: "Paver Blocks - Beautiful Pathways",
      category: "products",
      title: "Paver Blocks Type 1"
    },
    {
      id: 10,
      src: PaverBlock2,
      alt: "Paver Blocks - Decorative Flooring",
      category: "products",
      title: "Paver Blocks Type 2"
    },
    {
      id: 11,
      src: PreCast1,
      alt: "PreCast Boundary Wall - Secure Perimeters",
      category: "products",
      title: "PreCast Boundary Wall Type 1"
    },
    {
      id: 12,
      src: PreCast2,
      alt: "PreCast Boundary Wall - Modern Security",
      category: "products",
      title: "PreCast Boundary Wall Type 2"
    },

    // Projects
    {
      id: 13,
      src: KiranMedical,
      alt: "Kiran Medical Hospital - Main Building",
      category: "projects",
      title: "Kiran Medical Hospital"
    },
    {
      id: 14,
      src: KiranMedicalCollege,
      alt: "Kiran Medical College - Educational Complex",
      category: "projects",
      title: "Kiran Medical College"
    },
    {
      id: 15,
      src: KiranMedicalRoadCurving,
      alt: "Kiran Medical Road Curving - Infrastructure",
      category: "projects",
      title: "Kiran Medical Road Infrastructure"
    },

    // Team
    {
      id: 16,
      src: Director1,
      alt: "Managing Director - Leadership Team",
      category: "team",
      title: "Managing Director"
    },
    {
      id: 17,
      src: GroupPhoto,
      alt: "Group Photo - SunShine Enterprises Team",
      category: "team",
      title: "Team Group Photo"
    },
    {
      id: 18,
      src: Director1,
      alt: "Director 1 - Executive Team",
      category: "team",
      title: "Director"
    },
    {
      id: 19,
      src: Director2,
      alt: "Director 2 - Executive Team",
      category: "team",
      title: "Director"
    },
    {
      id: 20,
      src: Director3,
      alt: "Director 3 - Executive Team",
      category: "team",
      title: "Director"
    },
    {
      id: 21,
      src: Director3,
      alt: "Director 4 - Executive Team",
      category: "team",
      title: "Director"
    },
    {
      id: 22,
      src: Director2,
      alt: "Chairman - Board of Directors",
      category: "team",
      title: "Chairman"
    }
  ];

  const categories = [
    { id: 'all', label: 'All Images', count: galleryData.length },
    { id: 'products', label: 'Products', count: galleryData.filter(item => item.category === 'products').length },
    { id: 'projects', label: 'Projects', count: galleryData.filter(item => item.category === 'projects').length },
    { id: 'team', label: 'Team', count: galleryData.filter(item => item.category === 'team').length }
  ];

  const filteredImages = activeCategory === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === activeCategory);

  const openLightbox = (image, index) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const navigateImage = (direction) => {
    const newIndex = direction === 'next' 
      ? (currentIndex + 1) % filteredImages.length
      : (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    
    setCurrentIndex(newIndex);
    setSelectedImage(filteredImages[newIndex]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateImage('prev');
    if (e.key === 'ArrowRight') navigateImage('next');
  };

  React.useEffect(() => {
    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, currentIndex]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8 px-4">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            SunShine Enterprises Gallery
          </h1>
          <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive collection of high-quality construction materials, completed projects, and dedicated team members.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-3 py-2 md:px-6 md:py-3 rounded-full text-[11px] sm:text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                  : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 shadow-md'
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative bg-transparent rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden cursor-pointer border border-gray-200"
              onClick={() => openLightbox(image, index)}
            >
              <div className="aspect-w-4 aspect-h-3 overflow-hidden bg-gray-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-300 group-hover:scale-110 opacity-100"
                  loading="lazy"
                  style={{ backgroundColor: '#f3f4f6' }}
                />
              </div>
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-transparent bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <div className="transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <FaExpand className="text-white text-xl md:text-2xl drop-shadow-lg" />
                </div>
              </div>

              {/* Title */}
              <div className="p-3 md:p-4">
                <h3 className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-800 truncate">
                  {image.title}
                </h3>
                <p className="text-[8px] sm:text-[11px] md:text-xs text-gray-500 capitalize mt-1">
                  {image.category}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/60 bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full flex flex-col items-center justify-center">
            {/* Navigation Buttons - Outside image area */}
            {filteredImages.length > 1 && (
              <>
                <button
                  onClick={() => navigateImage('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-blue-500 bg-opacity-90 hover:bg-opacity-100 text-white-300 p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg"
                >
                  <FaChevronLeft className="text-sm sm:text-lg md:text-xl" />
                </button>
                <button
                  onClick={() => navigateImage('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-blue-500 bg-opacity-90 hover:bg-opacity-100 text-white-300 p-2 sm:p-3 rounded-full transition-all duration-200 shadow-lg"
                >
                  <FaChevronRight className="text-sm sm:text-lg md:text-xl" />
                </button>
              </>
            )}

            {/* Image Container - Fixed size */}
            <div className="relative bg-white rounded-lg p-4 shadow-2xl max-w-4xl max-h-[80vh] flex items-center justify-center">
              {/* Close Button - Upper right corner of image */}
              <button
                onClick={closeLightbox}
                className="absolute top-2 right-2 z-30 bg-white bg-opacity-90 hover:bg-opacity-100 text-red-500 p-2 sm:p-3 border border-red-800 rounded-full transition-all duration-200 shadow-lg"
              >
                <FaTimes className="text-sm sm:text-lg md:text-xl" />
              </button>
              
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full max-w-[800px] max-h-[600px] object-contain rounded-lg"
                style={{ backgroundColor: '#ffffff' }}
              />
            </div>

            {/* Image Info - Outside image area */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <div className="bg-black bg-opacity-70 text-white px-6 py-3 rounded-lg backdrop-blur-sm shadow-lg">
                <h3 className="text-sm md:text-lg font-semibold mb-1 text-center">{selectedImage.title}</h3>
                <p className="text-xs md:text-sm text-gray-300 text-center">
                  {currentIndex + 1} of {filteredImages.length} | {selectedImage.category}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredImages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-sm md:text-base">No images found in this category.</p>
        </div>
      )}
    </div>
  );
}
