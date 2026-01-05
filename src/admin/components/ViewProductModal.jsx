import React from 'react';
import { FaTimes, FaEye, FaCalendar, FaBoxOpen } from 'react-icons/fa';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function ViewProductModal({ showModal, product, onClose }) {
  if (!showModal || !product) {
    return null;
  }

  const getStatusColor = (isActive) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative z-[60]">
        {/* Fixed Modal Header */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 text-white p-3 sm:p-4 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaEye className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <div>
                <h2 className="text-base sm:text-lg font-bold">Product Details</h2>
                <p className="text-sm sm:text-base text-blue-100 mt-1">
                  View product information
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-blue-200 transition-colors p-1"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {/* Product Image */}
            <div className="space-y-4">
              <img
                src={`${API_BASE}${product.image_url}`}
                alt={product.product_name}
                className="w-full h-48 sm:h-64 object-cover rounded-lg border border-gray-200"
              />
              {/* Status */}
              <div className="flex gap-2">
                <span className={`px-3 py-1 text-xs sm:text-sm rounded-full font-medium ${getStatusColor(product.is_active)}`}>
                  {product.is_active ? 'active' : 'inactive'}
                </span>
              </div>
            </div>

            {/* Product Information */}
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">
                  {product.product_name}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {product.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Price</label>
                  <p className="text-base sm:text-lg font-bold text-red-500">₹{product.price} per {product.unit}</p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Category</label>
                  <p className="text-sm sm:text-base text-gray-900 capitalize">{product.category_name}</p>
                </div>
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                  <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Product ID</label>
                  <p className="text-sm sm:text-base text-gray-900">#{product.id}</p>
                </div>
                {/* Show all details from AddProduct.jsx */}
                <div className="bg-gray-50 p-3 sm:p-4 rounded-lg grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                    <p className="text-sm text-gray-900">{product.material}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                    <p className="text-sm text-gray-900">{product.size}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                    <p className="text-sm text-gray-900">{product.color}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Density</label>
                    <p className="text-sm text-gray-900">{product.density}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Compressive Strength</label>
                    <p className="text-sm text-gray-900">{product.compressive_strength}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Height</label>
                    <p className="text-sm text-gray-900">{product.height}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Width</label>
                    <p className="text-sm text-gray-900">{product.width}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Shape</label>
                    <p className="text-sm text-gray-900">{product.shape}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Feature</label>
                    <p className="text-sm text-gray-900">{product.feature}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Usage/Application</label>
                    <p className="text-sm text-gray-900">{product.usage_application}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wall Type</label>
                    <p className="text-sm text-gray-900">{product.wall_type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                    <p className="text-sm text-gray-900">{product.business_type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Grade</label>
                    <p className="text-sm text-gray-900">{product.grade}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Thermal Conductivity</label>
                    <p className="text-sm text-gray-900">{product.thermal_conductivity}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Water Absorption</label>
                    <p className="text-sm text-gray-900">{product.water_absorption}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Fire Rating</label>
                    <p className="text-sm text-gray-900">{product.fire_rating}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Finishing</label>
                    <p className="text-sm text-gray-900">{product.finishing}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Reinforcement</label>
                    <p className="text-sm text-gray-900">{product.reinforcement}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Wire Slots</label>
                    <p className="text-sm text-gray-900">{product.wire_slots}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Application</label>
                    <p className="text-sm text-gray-900">{product.application}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tolerance</label>
                    <p className="text-sm text-gray-900">{product.tolerance}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Setting Type</label>
                    <p className="text-sm text-gray-900">{product.setting_type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Surface Finishing</label>
                    <p className="text-sm text-gray-900">{product.surface_finishing}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                    <p className="text-sm text-gray-900">{product.weight}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Built Type</label>
                    <p className="text-sm text-gray-900">{product.built_type}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Plank Thickness</label>
                    <p className="text-sm text-gray-900">{product.plank_thickness}</p>
                  </div>
                </div>
              </div>

              {/* Statistics */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3">Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <FaCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <div>
                      <p className="text-sm sm:text-base text-gray-500">Created</p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900">{product.created_at ? product.created_at.split('T')[0] : ''}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
                    <div>
                      <p className="text-sm sm:text-base text-gray-500">Last Modified</p>
                      <p className="text-sm sm:text-base font-semibold text-gray-900">{product.updated_at ? product.updated_at.split('T')[0] : ''}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-200 flex-shrink-0 rounded-b-xl bg-white">
          <div className="flex justify-end space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs sm:text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
