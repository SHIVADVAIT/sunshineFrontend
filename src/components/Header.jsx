import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetAllProducts } from '../services/GetAllProducts';

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null); // Track which dropdown is open
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productCategories, setProductCategories] = useState([]);
  const dropdownRef = useRef(null);
  const aboutDropdownRef = useRef(null);
  const productsDropdownRef = useRef(null);
  const projectsDropdownRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
 

  const fetchCategories = async () => {
      try {
        const response = await GetAllProducts();
        if (response.data.success && response.data.data) {
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
        console.error('Error fetching categories for header:', error);
      }
    };
  // Fetch product categories on component mount
  useEffect(() => {
    

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
      // Search using GetAllProducts API
      GetAllProducts().then(response => {
        if (response.data.success && response.data.data) {
          // Find first product/category matching searchQuery
          const products = response.data.data;
          // Try to match by product name or category name
          const match = products.find(p =>
            p.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.category_name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (match) {
            // Navigate to category page
            navigate(`/${match.category_slug}`);
          } else {
            // Optionally show a toast or message for no match
            // toast.info('No matching product or category found');
          }
        }
        setIsSearchOpen(false);
        setSearchQuery('');
      });
    }
  };

  // Navigation handler
  const handleNavigation = (path) => {
    navigate(path);
    setOpenDropdown(null); // Close any open dropdowns after navigation
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target)) {
        if (openDropdown === 'about') setOpenDropdown(null);
      }
      if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target)) {
        if (openDropdown === 'products') setOpenDropdown(null);
      }
      if (projectsDropdownRef.current && !projectsDropdownRef.current.contains(event.target)) {
        if (openDropdown === 'projects') setOpenDropdown(null);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        if (isSearchOpen) setIsSearchOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (isSearchOpen) setIsSearchOpen(false);
        if (openDropdown) setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openDropdown, isSearchOpen]);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-100 hidden md:block">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-12 md:h-14 lg:h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <div className="flex items-center">
              <span className="text-xs md:text-sm lg:text-base xl:text-lg font-bold text-red-400 tracking-tight">
                SunShine EnterPrises
              </span>
              <span className="text-xs text-gray-500 ml-0.5 font-light">®</span>
            </div>
          </div>

          {/* Navigation - Centered */}
          <nav className="flex items-center justify-center flex-1 px-2 md:px-4 lg:px-8">
            <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4 xl:space-x-6">
              {/* About with Dropdown */}
              <div className="relative" ref={aboutDropdownRef}>
                <button 
                  onClick={() => toggleDropdown('about')}
                  onMouseEnter={() => {
                    // Only auto-open on hover for larger screens
                    if (window.innerWidth >= 768) {
                      setOpenDropdown('about');
                    }
                  }}
                  className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200 relative group text-xs md:text-sm lg:text-base whitespace-nowrap flex items-center py-1"
                >
                  About
                  <svg className="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-200 group-hover:w-full"></span>
                </button>
                
                {/* Dropdown Menu */}
                {openDropdown === 'about' && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-30 md:w-34 lg:w-35 bg-white rounded-md shadow-lg border border-gray-200 py-1 md:py-2 z-50"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button 
                      onClick={() => handleNavigation('/who-we-are')}
                      className="block w-full text-left px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors duration-200"
                    >
                      Who We Are
                    </button>
                    <button 
                      onClick={() => handleNavigation('/meet-our-team')}
                      className="block w-full text-left px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors duration-200"
                    >
                      Meet Our Team
                    </button>
                  </div>
                )}
              </div>
              
              {/* Products with Dropdown */}
              <div className="relative" ref={productsDropdownRef}>
                <button 
                  onClick={() => toggleDropdown('products')}
                  onMouseEnter={() => {
                    // Only auto-open on hover for larger screens
                    if (window.innerWidth >= 768) {
                      setOpenDropdown('products');
                    }
                  }}
                  className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200 relative group text-xs md:text-sm lg:text-base whitespace-nowrap flex items-center py-1"
                >
                  Products
                  <svg className="w-3 h-3 md:w-4 md:h-4   transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-200 group-hover:w-full"></span>
                </button>
                
                {/* Products Dropdown Menu */}
                {openDropdown === 'products' && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-30 md:w-34 lg:w-35 bg-white rounded-md shadow-lg border border-gray-200 py-1 md:py-2 z-50"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {productCategories.map((category, index) => (
                      <button 
                        key={index}
                        onClick={() => handleNavigation(`/${category.slug}`)}
                        className="block w-full text-left px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors duration-200"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Projects with Dropdown */}
              <div className="relative" ref={projectsDropdownRef}>
                <button 
                  onClick={() => toggleDropdown('projects')}
                  onMouseEnter={() => {
                    // Only auto-open on hover for larger screens
                    if (window.innerWidth >= 768) {
                      setOpenDropdown('projects');
                    }
                  }}
                  className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200 relative group text-xs md:text-sm lg:text-base whitespace-nowrap flex items-center   py-1"
                >
                  Projects
                  <svg className="w-3 h-3 md:w-4 md:h-4   transition-transform duration-200" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-200 group-hover:w-full"></span>
                </button>
                
                {/* Projects Dropdown Menu */}
                {openDropdown === 'projects' && (
                  <div 
                    className="absolute top-full left-0 mt-1 w-30 md:w-34 lg:w-35 bg-white rounded-md shadow-lg border border-gray-200 py-1 md:py-2 z-50"
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button 
                      onClick={() => handleNavigation('/project-one')}
                      className="block w-full text-left px-3 md:px-4 py-2 text-xs md:text-sm text-gray-700 hover:bg-gray-100 hover:text-red-500 transition-colors duration-200"
                    >
                      Project 1
                    </button>
                   
                  </div>
                )}
              </div>
              <button 
                onClick={() => {
                  setOpenDropdown(null); // Close any open dropdowns
                  handleNavigation('/gallery');
                }}
                onMouseEnter={() => {
                  // Close any open dropdowns when hovering over non-dropdown items
                  if (openDropdown) {
                    setOpenDropdown(null);
                  }
                }}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200 relative group text-xs md:text-sm lg:text-base whitespace-nowrap py-1"
              >
                Gallery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-200 group-hover:w-full"></span>
              </button>
              {/* <a href="#sustainability" className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200 relative group text-xs md:text-sm lg:text-base whitespace-nowrap px-1 py-1">
                Sustainability
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-200 group-hover:w-full"></span>
              </a>
              <a href="#resources" className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200 relative group text-xs md:text-sm lg:text-base whitespace-nowrap px-1 py-1">
                Resources
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-200 group-hover:w-full"></span>
              </a> */}
              <button 
                onClick={() => {
                  setOpenDropdown(null); // Close any open dropdowns
                  handleNavigation('/clients');
                }}
                onMouseEnter={() => {
                  // Close any open dropdowns when hovering over non-dropdown items
                  if (openDropdown) {
                    setOpenDropdown(null);
                  }
                }}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200 relative group text-xs md:text-sm lg:text-base whitespace-nowrap py-1"
              >
                Our Clients
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-200 group-hover:w-full"></span>
              </button>
              <button 
                onClick={() => {
                  setOpenDropdown(null); // Close any open dropdowns
                  handleNavigation('/contact');
                }}
                onMouseEnter={() => {
                  // Close any open dropdowns when hovering over non-dropdown items
                  if (openDropdown) {
                    setOpenDropdown(null);
                  }
                }}
                className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-200 relative group text-xs md:text-sm lg:text-base whitespace-nowrap py-1"
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-400 transition-all duration-200 group-hover:w-full"></span>
              </button>
            </div>
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-1 md:space-x-2">
            {/* Search Icon */}
            <div className="relative" ref={searchRef}>
              <button 
                onClick={toggleSearch}
                className="text-gray-600 hover:text-red-500 transition-colors duration-200 p-1 md:p-1.5"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Search Overlay */}
              {isSearchOpen && (
                <div className="absolute top-full right-0 mt-2 w-60 sm:w-70 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                  <form onSubmit={handleSearch} className="p-4">
                    <div className="relative">
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products, projects..."
                        className="w-full px-3 py-2  text-[10px] sm:text-[12px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Quick Search Suggestions */}
                    {/* <div className="mt-4 border-t border-gray-100 pt-4">
                      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Quick Links</h3>
                      <div className="space-y-2">
                        {productCategories.slice(0, 4).map((category, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              handleNavigation(`/${category.slug}`);
                              setIsSearchOpen(false);
                              setSearchQuery('');
                            }}
                            className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 rounded-md transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                            {category.name}
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => {
                            handleNavigation('/project-one');
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 rounded-md transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0h3m2 0h5" />
                          </svg>
                          Kiran Medical Project
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            handleNavigation('/contact');
                            setIsSearchOpen(false);
                            setSearchQuery('');
                          }}
                          className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-500 rounded-md transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Contact Us
                        </button>
                      </div>
                    </div> */}
                    
                    {/* Search Footer */}
                    <div className="mt-4 border-t border-gray-100 pt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>Press Enter to search</span>
                        <span>ESC to close</span>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            
            {/* Social Media Icons */}
            <div className="flex items-center space-x-1">
              {/* Instagram */}
              <a href="#" className="bg-red-400 hover:bg-red-500 text-white p-1 md:p-1.5 rounded-full transition-colors duration-200">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              
              {/* Facebook */}
              <a href="#" className="bg-red-400 hover:bg-red-500 text-white p-1 md:p-1.5 rounded-full transition-colors duration-200">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              
              {/* LinkedIn */}
              <a href="#" className="bg-red-400 hover:bg-red-500 text-white p-1 md:p-1.5 rounded-full transition-colors duration-200">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              
              {/* YouTube */}
              <a href="#" className="bg-red-400 hover:bg-red-500 text-white p-1 md:p-1.5 rounded-full transition-colors duration-200">
                <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
