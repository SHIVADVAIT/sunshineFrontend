import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAllProducts } from '../services/GetAllProducts';

export default function MobileHeader() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productCategories, setProductCategories] = useState([]);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch product categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetAllProducts();
        if (response.data.success && response.data.data) {
          // Extract unique categories
          const categories = [...new Set(response.data.data.map(product => product.category_slug))]
            .map(slug => {
              const product = response.data.data.find(p => p.category_slug === slug);
              return {
                name: product.category_name,
                slug: slug
              };
            })
            .sort((a, b) => a.name.localeCompare(b.name));
          
          setProductCategories(categories);
        }
      } catch (error) {
        console.error('Error fetching categories for mobile header:', error);
      }
    };

    fetchCategories();
  }, []);

  // Helper function to open a dropdown and close others
  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  // Search handler
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setOpenDropdown(null); // Close any open dropdowns when search opens
    if (!isSearchOpen) {
      // Focus on search input when opening
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }, 100);
    }
  };

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // You can implement search logic here
      console.log('Searching for:', searchQuery);
      // For now, we'll just close the search
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);  
    setOpenDropdown(null);
    setIsSearchOpen(false); // Close search when navigating
  };

  // Close search when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (isSearchOpen) setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSearchOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 md:hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-14">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <span className="text-[14px] sm:text-base lg:text-lg font-bold text-red-400 tracking-tight">
                SunShine EnterPrises
              </span>
              <span className="text-xs text-gray-500 ml-0.5 font-light">®</span>
            </div>
          </div>

          {/* Right Side - Search and Menu*/}
            
          <div className="flex items-center space-x-2">
            {/* Search Button */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={toggleSearch}
                className="text-gray-600 hover:text-red-500 transition-colors duration-200 p-1.5 sm:p-2"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Search Overlay for Mobile */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-60 sm:w-70 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <form onSubmit={handleSearch} className="p-3 sm:p-4">
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products, projects..."
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Quick Search Suggestions for Mobile */}
                    <div className="mt-3 border-t border-gray-100 pt-3">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Quick Links</h3>
                      <div className="space-y-1">
                        {productCategories.slice(0, 4).map((category, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              handleNavigation(`/${category.slug}`);
                              setSearchQuery('');
                            }}
                            className="flex items-center w-full text-left px-2 py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 rounded-md transition-colors duration-200"
                          >
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {category.name}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            handleNavigation('/project-one');
                            setSearchQuery('');
                          }}
                          className="flex items-center w-full text-left px-2 py-1.5 text-xs sm:text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 rounded-md transition-colors duration-200"
                        >
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0h3m2 0h5" />
                          </svg>
                          Kiran Medical Project
                        </button>
                      </div>
                    </div>
                    
                    {/* Search Footer for Mobile */}
                   
                  </form>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-400 focus:outline-none focus:text-red-400 p-1.5 sm:p-2"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="pb-3 sm:pb-4 border-t border-gray-200 mt-2">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* About with Dropdown */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleDropdown('about')}
                  className="w-full text-left flex items-center justify-between text-gray-700 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
                >
                  About
                  <svg 
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === 'about' ? 'rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* About Dropdown Items */}
                {openDropdown === 'about' && (
                  <div className="pl-3 sm:pl-4 space-y-1">
                    <button 
                      onClick={() => handleNavigation('/who-we-are')}
                      className="block w-full text-left text-gray-600 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors duration-200"
                    >
                      Who We Are
                    </button>
                    <button 
                      onClick={() => handleNavigation('/meet-our-team')}
                      className="block w-full text-left text-gray-600 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors duration-200"
                    >
                      Meet Our Team
                    </button>
                  </div>
                )}
              </div>

              {/* Products with Dropdown */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleDropdown('products')}
                  className="w-full text-left flex items-center justify-between text-gray-700 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
                >
                  Products
                  <svg 
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === 'products' ? 'rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Products Dropdown Items */}
                {openDropdown === 'products' && (
                  <div className="pl-3 sm:pl-4 space-y-1">
                    {productCategories.map((category, index) => (
                      <button 
                        key={index}
                        onClick={() => handleNavigation(`/${category.slug}`)}
                        className="block w-full text-left text-gray-600 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors duration-200"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Projects with Dropdown */}
              <div className="space-y-1">
                <button 
                  onClick={() => toggleDropdown('projects')}
                  className="w-full text-left flex items-center justify-between text-gray-700 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
                >
                  Projects
                  <svg 
                    className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${openDropdown === 'projects' ? 'rotate-180' : ''}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Projects Dropdown Items */}
                {openDropdown === 'projects' && (
                  <div className="pl-3 sm:pl-4 space-y-1">
                    <button 
                      onClick={() => handleNavigation('/project-one')}
                      className="block w-full text-left text-gray-600 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-xs sm:text-sm transition-colors duration-200"
                    >
                      Project 1
                    </button>
                    
                  </div>
                )}
              </div>

              {/* Other Navigation Items */}
              <button 
                onClick={() => handleNavigation('/gallery')}
                className="block w-full text-left text-gray-700 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
              >
                Gallery
              </button>
              <button 
                onClick={() => handleNavigation('/clients')}
                className="block w-full text-left text-gray-700 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
              >
                Our Clients
              </button>
              <button 
                onClick={() => handleNavigation('/contact')}
                className="block w-full text-left text-gray-700 hover:text-red-400 hover:bg-gray-50 px-2 sm:px-3 py-2 rounded-md text-sm sm:text-base font-medium transition-colors duration-200"
              >
                Contact
              </button>

              {/* Social Media Icons */}
              <div className="pt-3 sm:pt-4 border-t border-gray-200 mt-3 sm:mt-4">
                <div className="flex items-center justify-center px-2 sm:px-3">
                  <div className="flex space-x-2 sm:space-x-3">
                    {/* Instagram */}
                    <a href="#" className="bg-red-400 hover:bg-red-500 text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </a>
                    
                    {/* Facebook */}
                    <a href="#" className="bg-red-400 hover:bg-red-500 text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    
                    {/* LinkedIn */}
                    <a href="#" className="bg-red-400 hover:bg-red-500 text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    </a>
                    
                    {/* YouTube */}
                    <a href="#" className="bg-red-400 hover:bg-red-500 text-white p-1.5 sm:p-2 rounded-full transition-colors duration-200">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
