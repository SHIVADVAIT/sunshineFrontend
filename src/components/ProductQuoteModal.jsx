import React, { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { FaTimes, FaEnvelope } from 'react-icons/fa';
import { submitInquiry } from '../services/submitInquiry';
const API_BASE = import.meta.env.VITE_API_BASE_URL;




export default function ProductQuoteModal({ 
  showModal, 
  selectedProduct, 
  onClose 
}) {
  const [formData, setFormData] = useState({
    quantity: '',
    mobile: '',
    name: '',
    email: ''
  });

  // Country code dropdown state
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('+91');
  const [countrySearch, setCountrySearch] = useState('');
  const countryDropdownRef = useRef(null);
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

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
    { code: '+7', country: 'Russia', flag: '🇷🇺' }
  ];

  // Filter country codes based on search
  const filteredCountries = countryCodes.filter(country =>
    country.country.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.includes(countrySearch)
  );

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!showModal) {
      setFormData({
        quantity: '',
        mobile: '',
        name: '',
        email: ''
      });
    }
  }, [showModal]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target)) {
        setShowCountryDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'mobile') {
      // Only allow digits and limit to 10 characters
      const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!formData.mobile || formData.mobile.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    
    if (!formData.quantity || formData.quantity <= 0) {
      toast.error('Please enter a valid quantity');
      return;
    }
    
    try {
      // Prepare inquiry payload with only required fields
      const inquiryPayload = {
        name: formData.name.trim(),
        productId: selectedProduct.id,
        mobile: formData.mobile,
        countryCode: selectedCountry,
        quantity: parseInt(formData.quantity),
        unit: selectedProduct.unit ? selectedProduct.unit.replace('/ ', '') : 'Pieces'
      };
      
      
      const response = await submitInquiry({ payload: inquiryPayload });
      
      console.log('Inquiry submitted successfully:', response);
      toast.success(`Quote request submitted successfully for ${selectedProduct.name}!`);
      
      onClose();
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      toast.error('Failed to submit quote request. Please try again.');
    }
  };

  if (!showModal || !selectedProduct) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col">
        {/* Fixed Modal Header */}
        <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-3 sm:p-2 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs sm:text-sm font-bold">Get Best Price</h2>
              <p className="text-xs sm:text-sm text-red-100 mt-1">
                {selectedProduct.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-200 transition-colors p-1"
            >
              <FaTimes className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1    p-2 sm:p-2">
          {/* Product Info */}
          <div className="bg-gray-50 rounded-lg p-3 sm:p-2 mb-1">
            <img
              src={`${API_BASE}${selectedProduct.image}`}
              alt={selectedProduct.name}
              className="w-full h-24 sm:h-32 object-cover rounded-lg mb-3"
            />
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-semibold text-gray-900">Price:</span>
                <span className="text-xs sm:text-sm font-bold text-red-500">
                  {selectedProduct.price} {selectedProduct.unit}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs sm:text-sm font-semibold text-gray-900">MOQ:</span>
                <span className="text-xs sm:text-sm text-gray-700">
                  {selectedProduct.minOrder}
                </span>
              </div>
            </div>
          </div>

          {/* Quote Form */}
          <div className="space-y-3 sm:space-y-4">
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none hover:border-red-400 transition-colors"
                  placeholder="Enter your name"
                />
              </div>

              <div className="relative">
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                  Mobile Number *
                </label>
                <div className="flex rounded-lg border border-gray-300 hover:border-red-400 transition-colors">
                  {/* Country Code Select */}
                  <select
                    name="country_code"
                    value={selectedCountry}
                    onChange={e => setSelectedCountry(e.target.value)}
                    className="w-16 px-1 py-2 border-0 rounded-l-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-red-400 bg-gray-50"
                  >
                    {countryCodes.map(c => (
                      <option key={c.code} value={c.code}>
                          {c.code}
                      </option>
                    ))}
                  </select>
                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    required
                    maxLength="10"
                    pattern="[0-9]*"
                    inputMode="numeric"
                    className="flex-1 px-1 py-2 text-xs sm:text-sm border-0 rounded-r-lg focus:outline-none"
                    placeholder="Contact No."
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none hover:border-red-400 transition-colors"
                  placeholder="Quantity"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-900 mb-1">
                  Unit
                </label>
                <select
                  name="unit"
                  value={formData.unit || (selectedProduct.unit ? selectedProduct.unit.replace('/ ', '') : 'Pieces')}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg bg-gray-100 text-gray-700"
                >
                  <option value="Pieces">Pieces</option>
                  <option value="Square Feet">Square Feet</option>
                  <option value="Cubic Feet">Cubic Feet</option>
                  <option value="Kilograms">Kilograms</option>
                  <option value="Meters">Meters</option>
                  <option value="Tons">Tons</option>
                  <option value="Liters">Liters</option>
                  {/* Add more units as needed */}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-200 flex-shrink-0 rounded-b-xl bg-white">
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="w-full bg-red-400 hover:bg-red-500 text-white py-2 sm:py-3 px-4 rounded-lg font-semibold text-xs sm:text-sm transition-colors duration-300 flex items-center justify-center gap-2 mb-3"
            >
              <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4" />
              Send Enquiry
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
