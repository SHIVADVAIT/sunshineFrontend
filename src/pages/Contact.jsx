import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {submitContactForm} from  '../services/ContactService';
import { GetAllCategories } from '../services/AdminProduct';
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock, 
  FaPaperPlane, 
  FaSpinner,
  FaBuilding,
  FaIndustry,
  FaHome,
  FaRoad,
  FaHammer,
  FaTools
} from 'react-icons/fa';
import { 
  MdConstruction, 
  MdLocationOn 
} from 'react-icons/md';
import { 
  HiOfficeBuilding 
} from 'react-icons/hi';


export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    message: '',
    budget: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Product/Service dropdown state
  const [showProductDropdown, setShowProductDropdown] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const dropdownRef = useRef(null);

  // Country code dropdown state
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProductDropdown(false);
      }
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await GetAllCategories();
        if (response.data && response.data.success && response.data.data) {
          setCategories(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Failed to load product categories');
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Available products/services - dynamically loaded from backend categories
  const availableProducts = categories.map(category => category.name);

  // Available country codes
  const countryCodes = [
    { code: '+91', country: 'India', flag: '🇮🇳' },
    { code: '+1', country: 'United States', flag: '🇺🇸' },
    { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
    { code: '+86', country: 'China', flag: '🇨🇳' },
    { code: '+81', country: 'Japan', flag: '🇯🇵' },
    { code: '+49', country: 'Germany', flag: '🇩🇪' },
    { code: '+33', country: 'France', flag: '🇫🇷' },
    { code: '+39', country: 'Italy', flag: '🇮🇹' },
    { code: '+34', country: 'Spain', flag: '🇪🇸' },
    { code: '+7', country: 'Russia', flag: '🇷🇺' },
    { code: '+82', country: 'South Korea', flag: '🇰🇷' },
    { code: '+55', country: 'Brazil', flag: '🇧🇷' },
    { code: '+27', country: 'South Africa', flag: '🇿🇦' },
    { code: '+61', country: 'Australia', flag: '🇦🇺' },
    { code: '+52', country: 'Mexico', flag: '🇲🇽' },
    { code: '+65', country: 'Singapore', flag: '🇸🇬' },
    { code: '+971', country: 'UAE', flag: '🇦🇪' },
    { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
    { code: '+66', country: 'Thailand', flag: '🇹🇭' }
  ];

  // Filter products based on search
  const filteredProducts = availableProducts.filter(product =>
    product.toLowerCase().includes((formData.projectType || '').toLowerCase())
  );

  // Filter country codes based on search
  const filteredCountries = countryCodes.filter(country =>
    country.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  );

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Remove all non-digit characters and limit to 10 digits
      const digitsOnly = value.replace(/\D/g, '');
      const limitedDigits = digitsOnly.slice(0, 10);
      setFormData((prev) => ({ ...prev, [name]: limitedDigits }));
    } else if (name === 'name') {
      // Only allow letters and spaces for name
      const lettersOnly = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData((prev) => ({ ...prev, [name]: lettersOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

     if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Product dropdown handlers
  const handleProductSelect = (product) => {
    setFormData(prev => ({ ...prev, projectType: product }));
    setShowProductDropdown(false);
  };

  const handleProductSearchChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, projectType: value }));
    setShowProductDropdown(true);
  };

  // Country code dropdown handlers
  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
    setShowCountryDropdown(false);
    setCountrySearch('');
  };

  const handleCountrySearchChange = (e) => {
    const value = e.target.value;
    setCountrySearch(value);
    setShowCountryDropdown(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should only contain letters and spaces';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Please enter a valid email address';
      }
    }
    
    // Phone validation - Indian mobile numbers
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length !== 10) {
      newErrors.phone = 'Phone number must be exactly 10 digits';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = 'Enter a valid Indian mobile number starting with 6, 7, 8, or 9';
    }
    
    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Project details are required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Please provide more details (minimum 10 characters)';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();
  
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }
  
  setIsSubmitting(true);
  
  try {
    const submissionData = {
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  country_code: selectedCountry,
  company: formData.company || "",
  project_type: formData.projectType || "",
  budget: formData.budget || "",
  message: formData.message
};



    const response = await submitContactForm({ contact: submissionData });
    if(response.success){
      toast.success('Thank you for your inquiry! We will contact you soon.');
    }
  
    alert('Thank you for your inquiry! We will contact you soon.');
    // setFormData({
    //   name: '', email: '', phone: '', company: '', 
    //   projectType: '', message: '', budget: ''
    // });
  } catch (error) {
    alert('Submission failed. Please try again later.');
    console.error('Error:', error);
  } finally {
    setIsSubmitting(false);
  }
};

  const contactInfo = {
    company: "Sunshine Enterprises",
    address: {
      office: {
        line1: "Marwari Motor Service, Near Old Bus Stand",
        city: "Hazaribagh, Jharkhand - 825301",
        country: "India"
      },
      plant: {
        line1: "Jamuari Phatha, Barkagaon Road",
        city: "Hazaribagh, Jharkhand - 825301",
        country: "India"
      }
    },
    phone: {
      primary: "+91 9953050186",
      secondary: "+91 9431141333",
      tertiary: "+91 7541072627"
    },
    email: {
      general: "sunshineenterprises.2008@rediffmail.com",
      sales: "yashagarwal14@gmail.com"
    },
    timings: {
      weekdays: "9:00 AM - 6:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    gst: "20ABLFS9276L1ZK"
  };

  const services = [
    { name: "Paver Blocks", icon: <MdConstruction /> },
    { name: "Fly Ash Bricks", icon: <FaBuilding /> },
    { name: "Precast Boundary Wall", icon: <HiOfficeBuilding /> },
    { name: "Ccon Blocks", icon: <FaIndustry /> },
    { name: "Kerb Stone", icon: <FaRoad /> },
    { name: "Fencing Poles", icon: <FaTools /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Headers */}
      <ToastContainer autoClose={3000} />
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3">
          <nav className="text-xs sm:text-sm text-gray-500">
 <button onClick={() => navigate('/')} className="hover:text-red-400 transition-colors">
              Home
            </button>            <span className="mx-1 sm:mx-2">/</span>
            <span className="text-red-400 font-medium">Contact Us</span>
          </nav>
        </div>
      </div>

      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Contact Information Sidebar - Now on Left */}
          <div className="lg:col-span-1 space-y-6 sm:space-y-8">
            
            {/* Company Info */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                Contact Information
              </h3>
              
              <div className="space-y-4 sm:space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-2">Addresses</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-800">Office Address:</p>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {contactInfo.address.office.line1}<br />
                          {contactInfo.address.office.city}<br />
                          {contactInfo.address.office.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-medium text-gray-800">Plant Address:</p>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                          {contactInfo.address.plant.line1}<br />
                          {contactInfo.address.plant.city}<br />
                          {contactInfo.address.plant.country}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaPhone className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      <a href={`tel:${contactInfo.phone.primary}`} className="hover:text-blue-600 transition-colors">
                        {contactInfo.phone.primary}
                      </a><br />
                      <a href={`tel:${contactInfo.phone.secondary}`} className="hover:text-blue-600 transition-colors">
                        {contactInfo.phone.secondary}
                      </a><br />
                      <a href={`tel:${contactInfo.phone.tertiary}`} className="hover:text-blue-600 transition-colors">
                        {contactInfo.phone.tertiary}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      <a href={`mailto:${contactInfo.email.general}`} className="hover:text-blue-600 transition-colors break-all">
                        {contactInfo.email.general}
                      </a><br />
                      <a href={`mailto:${contactInfo.email.sales}`} className="hover:text-blue-600 transition-colors break-all">
                        {contactInfo.email.sales}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1">Business Hours</h4>
                    <p className="text-xs sm:text-sm text-gray-700">
                      Mon-Fri: {contactInfo.timings.weekdays}<br />
                      Saturday: {contactInfo.timings.saturday}<br />
                      Sunday: {contactInfo.timings.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Services */}
            

            {/* Quick Contact */}
            <div className="bg-red-400 rounded-2xl p-4 sm:p-6 text-white">
              <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">
                Need Immediate Assistance?
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mb-4 sm:mb-6">
                Call us directly for urgent inquiries or immediate project discussions.
              </p>
              <a 
                href={`tel:${contactInfo.phone.primary}`}
                className="block w-full bg-white text-blue-600 text-center py-2 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-colors"
              >
                Call Now: {contactInfo.phone.primary}
              </a>
            </div>
          </div>
          
          {/* Contact Form - Now on Right */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6 border-b border-gray-200 pb-2 sm:pb-3">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      pattern="[A-Za-z\s]*"
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border rounded-lg focus:outline-none hover:border-red-400 transition-colors ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border rounded-lg focus:outline-none hover:border-red-400 transition-colors ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone and Company Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                      Phone Number *
                    </label>
                    <div className={`flex group hover:shadow-sm transition-all duration-200 rounded-lg border hover:border-red-400 ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-300'
                    }`}>
                      {/* Country Code Dropdown */}
                      <div className="relative" ref={countryDropdownRef}>
                        <button
                          type="button"
                          onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          className={`flex items-center px-3 py-2 sm:py-3 border-r border-transparent rounded-l-lg text-xs sm:text-sm bg-gray-50 group-hover:bg-transparent focus:outline-none transition-all duration-200 min-w-0 ${
                            errors.phone ? 'bg-red-50' : ''
                          }`}
                        >
                          <span className="mr-1 text-sm">
                            {countryCodes.find(c => c.code === selectedCountry)?.flag}
                          </span>
                          <span className="hidden sm:inline mr-1">
                            {selectedCountry}
                          </span>
                          <span className="sm:hidden mr-1">
                            {selectedCountry}
                          </span>
                          <svg className="w-3 h-3 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                        
                        {/* Country Dropdown */}
                        {showCountryDropdown && (
                          <div className="absolute z-50 w-64 sm:w-80 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-hidden">
                            {/* Search Input */}
                            <div className="p-2 border-b border-gray-200">
                              <input
                                type="text"
                                value={countrySearch}
                                onChange={handleCountrySearchChange}
                                className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded focus:outline-none hover:border-red-400 transition-colors"
                                placeholder="Search countries..."
                              />
                            </div>
                            
                            {/* Country List */}
                            <div className="overflow-y-auto max-h-40">
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country, index) => (
                                  <div
                                    key={index}
                                    onClick={() => handleCountrySelect(country.code)}
                                    className="flex items-center px-3 py-2 text-xs sm:text-sm border-b border-gray-100 last:border-b-0"
                                  >
                                    <span className="mr-3 text-base">{country.flag}</span>
                                    <span className="mr-3 font-medium">{country.code}</span>
                                    <span className="text-gray-600">{country.country}</span>
                                  </div>
                                ))
                              ) : (
                                <div className="px-3 py-2 text-xs sm:text-sm text-gray-500">
                                  No countries found
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Phone Number Input */}
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        maxLength="10"
                        pattern="[0-9]*"
                        inputMode="numeric"
                        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border-0 rounded-r-lg focus:outline-none duration-200"
                        placeholder="Enter mobile number"
                      />
                    </div>
                    {/* {errors.phone && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.phone}</p>} */}
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none hover:border-red-400 transition-colors"
                      placeholder="Enter your company name"
                    />
                  </div>
                </div>

                {/* Product/Services and Budget Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="relative" ref={dropdownRef}>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                      Product / Services
                    </label>
                    <input
                      type="text"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleProductSearchChange}
                      onFocus={() => setShowProductDropdown(true)}
                      disabled={isLoadingCategories}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none hover:border-red-400 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder={isLoadingCategories ? "Loading categories..." : "Search for products/services..."}
                    />
                    
                    {/* Dropdown for products */}
                    {showProductDropdown && !isLoadingCategories && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredProducts.length > 0 ? (
                          filteredProducts.map((product, index) => (
                            <div
                              key={index}
                              onClick={() => handleProductSelect(product)}
                              className="px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              {product}
                            </div>
                          ))
                        ) : (
                          <div className="px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-500">
                            No products found
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Loading indicator for categories */}
                    {isLoadingCategories && (
                      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-3">
                        <div className="flex items-center justify-center">
                          <FaSpinner className="w-4 h-4 animate-spin text-gray-400 mr-2" />
                          <span className="text-xs sm:text-sm text-gray-500">Loading categories...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none hover:border-red-400 transition-colors"
                    >
                      <option value="">Select budget range</option>
                      <option value="under-5lac">Under ₹5 Lakh</option>
                      <option value="5lac-20lac">₹5 Lakh - ₹20 Lakh</option>
                      <option value="20lac-50lac">₹20 Lakh - ₹50 Lakh</option>
                      <option value="50lac-1cr">₹50 Lakh - ₹1 Crore</option>
                      <option value="above-1cr">Above ₹1 Crore</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm border rounded-lg focus:outline-none hover:border-red-400 transition-colors resize-vertical ${
                      errors.message ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Describe your project requirements, quantities needed, timeline, and any specific details..."
                  ></textarea>
                  {errors.message && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-red-400 hover:bg-red-500 disabled:bg-blue-400 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white py-2 sm:py-4 lg:py-6">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3">
              Visit Our Location
            </h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Find us at our Hazaribagh facility for direct consultations and product viewing
            </p>
          </div>
          
          {/* <div className="bg-gray-100 rounded-2xl h-64 sm:h-80 lg:h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <MdLocationOn className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1 sm:mb-2">
                Interactive Map Coming Soon
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Hazaribagh, Jharkhand - 825301
              </p>
            </div>
          </div> */}
        </div>
      </div>

     </div>
  );
}
