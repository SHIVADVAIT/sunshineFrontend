import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit, FaSave, FaUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
const API_BASE = import.meta.env.VITE_API_BASE_URL;
import { GetAllCategories } from '../../services/AdminProduct';
import { UpdateProducts } from '../../services/DeleteAndUpdateProduct';


export default function EditProductModal({ showModal, product, onClose, onSave }) {
  const [formData, setFormData] = useState({
    product_name: '',
    product_slug: '',
    category_name: '',
    category_slug: '',
    price: '',
    unit: 'Piece',
    min_order_quantity: '',
    min_order_unit: 'Pieces',
    image_url: '',
    description: '',
    material: '',
    size: '',
    color: '',
    density: '',
    compressive_strength: '',
    height: '',
    width: '',
    shape: '',
    feature: '',
    usage_application: '',
    wall_type: '',
    business_type: '',
    grade: '',
    thermal_conductivity: '',
    water_absorption: '',
    fire_rating: '',
    finishing: '',
    reinforcement: '',
    wire_slots: '',
    application: '',
    tolerance: '',
    setting_type: '',
    surface_finishing: '',
    weight: '',
    built_type: '',
    plank_thickness: '',
    is_active: true
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const categories = await GetAllCategories();
      // Handle categories (e.g., set them in state)
      console.log('Fetched categories:', categories.data.data);
      setCategories(categories.data.data);
    } catch (error) {
      console.error('Error fetching categories', error);
    }
  };
   

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (product && showModal) {
      setFormData({
        product_name: product.product_name || '',
        product_slug: product.product_slug || '',
        category_name: product.category_name || '',
        category_slug: product.category_slug || '',
        price: product.price || '',
        unit: product.unit || 'Piece',
        min_order_quantity: product.min_order_quantity || '',
        min_order_unit: product.min_order_unit || 'Pieces',
        image_url: product.image_url || '',
        description: product.description || '',
        material: product.material || '',
        size: product.size || '',
        color: product.color || '',
        density: product.density || '',
        compressive_strength: product.compressive_strength || '',
        height: product.height || '',
        width: product.width || '',
        shape: product.shape || '',
        feature: product.feature || '',
        usage_application: product.usage_application || '',
        wall_type: product.wall_type || '',
        business_type: product.business_type || '',
        grade: product.grade || '',
        thermal_conductivity: product.thermal_conductivity || '',
        water_absorption: product.water_absorption || '',
        fire_rating: product.fire_rating || '',
        finishing: product.finishing || '',
        reinforcement: product.reinforcement || '',
        wire_slots: product.wire_slots || '',
        application: product.application || '',
        tolerance: product.tolerance || '',
        setting_type: product.setting_type || '',
        surface_finishing: product.surface_finishing || '',
        weight: product.weight || '',
        built_type: product.built_type || '',
        plank_thickness: product.plank_thickness || '',
        is_active: product.is_active
      });
      setImageFile(null);
    }
  }, [product, showModal]);

  // Generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'product_name') {
      setFormData(prev => ({
        ...prev,
        product_name: value,
        product_slug: generateSlug(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // Only set image_url to file name for preview, actual URL comes from backend after upload
      setFormData(prev => ({
        ...prev,
        image_url: file.name // This will be replaced by backend response after update
      }));
      toast.success('Image selected successfully!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form data
    if (!formData.product_name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!formData.price) {
      toast.error('Product price is required');
      return;
    }
    setIsLoading(true);
    try {
      // Prepare FormData for backend (including image file)
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        // Don't send image_url if uploading a new image
        if (key === 'image_url' && imageFile) return;
        let value = formData[key];
        // Always send all fields, even empty string or false
        if (typeof value === 'boolean') {
          formDataToSend.append(key, value ? 'true' : 'false');
        } else if (typeof value === 'number') {
          formDataToSend.append(key, value.toString());
        } else if (value !== undefined) {
          formDataToSend.append(key, value);
        } else {
          formDataToSend.append(key, '');
        }
      });
      if (imageFile) {
        formDataToSend.append('image', imageFile); // 'image' should match backend field
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      const response = await UpdateProducts(product.id, formDataToSend);
      if(response.data.success){
        toast.success('Product updated successfully!');
      }
      // Use backend response for updated fields
      let updatedProduct = {
        ...product,
        ...response.data.data,
        updated_at: new Date().toISOString()
      };
      onSave(updatedProduct);
      onClose();
    } catch (error) {
      toast.error('Failed to update product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showModal || !product) {
    return null;
  }

  // const categories = [
  //   { value: 'ccon-blocks', label: 'Concrete Blocks' },
  //   { value: 'fly-ash-bricks', label: 'Fly Ash Bricks' },
  //   { value: 'paver-blocks', label: 'Paver Blocks' },
  //   { value: 'kerb-stone', label: 'Kerb Stone' },
  //   { value: 'fencing-poles', label: 'Fencing Poles' },
  //   { value: 'precast-boundary-wall', label: 'Precast Boundary Wall' }
  // ];
  const priceUnits = ['Piece', 'Square Feet', 'Cubic Feet', 'Kilogram'];
  const orderUnits = ['Pieces', 'Square Feet', 'Cubic Feet', 'Kilograms'];

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col relative z-[60]">
        {/* Fixed Modal Header */}
        <div className="bg-gradient-to-r from-green-400 to-green-500 text-white p-3 sm:p-4 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaEdit className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <div>
                <h2 className="text-sm sm:text-base font-bold">Edit Product</h2>
                <p className="text-xs sm:text-sm text-green-100 mt-1">
                  Update product information
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-green-200 transition-colors p-1"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Left Column - Image */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-2">
                    Product Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="mb-2"
                  />
                  {imageFile ? (
                    <div className="relative">
                      <img
                        src={URL.createObjectURL(imageFile)}
                        alt="Product Preview"
                        className="w-full h-32 sm:h-40 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setFormData(prev => ({ ...prev, image_url: '' }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    formData.image_url && (
                      <div className="relative">
                        <img
                          src={`${API_BASE}${formData.image_url}`}
                          alt="Product"
                          className="w-full h-32 sm:h-40 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image_url: '' }))}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          <FaTimes />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Right Column - Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Slug (Auto-generated)
                  </label>
                  <input
                    type="text"
                    name="product_slug"
                    value={formData.product_slug}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm bg-gray-50"
                    placeholder="auto-generated-slug"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category_slug"
                    value={formData.category_slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.slug}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
                    placeholder="Enter product description"
                  />
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Price *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition-colors"
                    placeholder="₹45 per piece"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Price Unit</label>
                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                  >
                    {priceUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Minimum Order Quantity *</label>
                  <input
                    type="number"
                    name="min_order_quantity"
                    value={formData.min_order_quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                    placeholder="100"
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Minimum Order Unit</label>
                  <select
                    name="min_order_unit"
                    value={formData.min_order_unit}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                  >
                    {orderUnits.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center mt-2">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 mr-2">
                      Active
                    </label>
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-green-500 border-gray-300 rounded focus:ring-green-400"
                    />
                  </div>
                </div>
                {/* Additional fields from AddProduct.jsx */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <input type="text" name="material" value={formData.material} onChange={handleInputChange} placeholder="Material" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="size" value={formData.size} onChange={handleInputChange} placeholder="Size" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="color" value={formData.color} onChange={handleInputChange} placeholder="Color" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="density" value={formData.density} onChange={handleInputChange} placeholder="Density" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="compressive_strength" value={formData.compressive_strength} onChange={handleInputChange} placeholder="Compressive Strength" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="height" value={formData.height} onChange={handleInputChange} placeholder="Height" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="width" value={formData.width} onChange={handleInputChange} placeholder="Width" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="shape" value={formData.shape} onChange={handleInputChange} placeholder="Shape" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="feature" value={formData.feature} onChange={handleInputChange} placeholder="Feature" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="usage_application" value={formData.usage_application} onChange={handleInputChange} placeholder="Usage/Application" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="wall_type" value={formData.wall_type} onChange={handleInputChange} placeholder="Wall Type" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="business_type" value={formData.business_type} onChange={handleInputChange} placeholder="Business Type" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="grade" value={formData.grade} onChange={handleInputChange} placeholder="Grade" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="thermal_conductivity" value={formData.thermal_conductivity} onChange={handleInputChange} placeholder="Thermal Conductivity" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="water_absorption" value={formData.water_absorption} onChange={handleInputChange} placeholder="Water Absorption" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="fire_rating" value={formData.fire_rating} onChange={handleInputChange} placeholder="Fire Rating" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="finishing" value={formData.finishing} onChange={handleInputChange} placeholder="Finishing" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="reinforcement" value={formData.reinforcement} onChange={handleInputChange} placeholder="Reinforcement" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="wire_slots" value={formData.wire_slots} onChange={handleInputChange} placeholder="Wire Slots" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="application" value={formData.application} onChange={handleInputChange} placeholder="Application" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="tolerance" value={formData.tolerance} onChange={handleInputChange} placeholder="Tolerance" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="setting_type" value={formData.setting_type} onChange={handleInputChange} placeholder="Setting Type" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="surface_finishing" value={formData.surface_finishing} onChange={handleInputChange} placeholder="Surface Finishing" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="weight" value={formData.weight} onChange={handleInputChange} placeholder="Weight" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="built_type" value={formData.built_type} onChange={handleInputChange} placeholder="Built Type" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                  <input type="text" name="plank_thickness" value={formData.plank_thickness} onChange={handleInputChange} placeholder="Plank Thickness" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm" />
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Fixed Modal Footer */}
        <div className="p-3 sm:p-4 border-t border-gray-200 flex-shrink-0 rounded-b-xl bg-white">
          <div className="flex justify-end space-x-2 sm:space-x-3">
            <button
              onClick={onClose}
              type="button"
              className="px-4 py-2 text-xs sm:text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-xs sm:text-sm"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
