import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createProduct } from '../../services/AddProduct';
import { GetAllProducts } from '../../services/GetAllProducts';
import { 
  FaUpload, 
  FaImage, 
  FaTimes, 
  FaPlus,
  FaSave,
  FaSearch,
  FaFilter
} from 'react-icons/fa';

export default function AddProduct() {
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

  // Store image file separately
  const [imageFile, setImageFile] = useState(null);

  const [errors, setErrors] = useState({});
  const [productCategories, setProductCategories] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
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
            console.log(categories);
          }
        } catch (error) {
          console.error('Error fetching categories for header:', error);
        }
      };
    // Fetch product categories on component mount
    useEffect(() => {
      fetchCategories();
    }, []);
  

 
 

  const priceUnits = ['Piece', 'Square Feet', 'Cubic Feet', 'Kilogram'];
  const orderUnits = ['Pieces', 'Square Feet', 'Cubic Feet', 'Kilograms'];

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
    } else if (name === 'category_name') {
      if (value === '__add_new__') {
        setShowNewCategoryInput(true);
        setFormData(prev => ({ ...prev, category_name: '', category_slug: '' }));
      } else {
        setShowNewCategoryInput(false);
        const selectedCategory = productCategories.find(cat => cat.name === value);
        setFormData(prev => ({
          ...prev,
          category_name: value,
          category_slug: selectedCategory ? selectedCategory.slug : ''
        }));
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddNewCategory = () => {
    if (!newCategoryName.trim()) {
      toast.error('Category name cannot be empty');
      return;
    }
  const newSlug = generateSlug(newCategoryName);
  const newCat = { name: newCategoryName, slug: newSlug };
  setProductCategories(prev => [...prev, newCat]);
  setFormData(prev => ({ ...prev, category_name: newCategoryName, category_slug: newSlug }));
    setShowNewCategoryInput(false);
    setNewCategoryName('');
    toast.success('New category added!');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData(prev => ({
        ...prev,
        image_url: URL.createObjectURL(file)
      }));
      toast.success('Image selected successfully!');
    }
  };


  const validateForm = () => {
    const newErrors = {};
    
  if (!formData.product_name.trim()) newErrors.product_name = 'Product name is required';
  if (!formData.category_name) newErrors.category_name = 'Category is required';
  if (!formData.description.trim()) newErrors.description = 'Description is required';
  if (!formData.price) newErrors.price = 'Price is required';
  if (!formData.min_order_quantity) newErrors.min_order_quantity = 'Minimum order quantity is required';
    
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
      // Map frontend fields to backend expected fields
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'image_url') return; // image handled separately
        if (key === 'is_active') {
          formDataToSend.append(key, value ? 'true' : 'false');
        } else {
          formDataToSend.append(key, value);
        }
      });
      if (imageFile) {
        formDataToSend.append('image', imageFile);
      }
      console.log(formData.product_slug, formData.category_slug);
      const response = await createProduct(formDataToSend);

      console.log(response);
      if (response.data.success) {
        toast.success("Product created Successfully!");
      }
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Page header */}
      <ToastContainer autoClose={3000} />
      <div className="mb-6 sm:mb-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">Create a new product listing for your catalog</p>
      </div>

      
      

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">Basic Information</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="product_name"
                      value={formData.product_name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500 ${
                        errors.product_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter product name"
                    />
                    {errors.product_name && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.product_name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
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
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Category *
                    </label>
                    <select
                      name="category_name"
                      value={formData.category_name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500 ${
                        errors.category_name ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select category</option>
                      {productCategories.map(cat => (
                        <option key={cat.slug} value={cat.name}>{cat.name}</option>
                      ))}
                      <option value="__add_new__">Add new category...</option>
                    </select>
                    {showNewCategoryInput && (
                      <div className="flex mt-2 gap-2">
                        <input
                          type="text"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm"
                          placeholder="Enter new category name"
                          value={newCategoryName}
                          onChange={e => setNewCategoryName(e.target.value)}
                        />
                        <button
                          type="button"
                          className="bg-green-500 text-white px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-green-600"
                          onClick={handleAddNewCategory}
                        >
                          Add
                        </button>
                        <button
                          type="button"
                          className="bg-gray-300 text-gray-700 px-3 py-2 rounded-lg text-xs sm:text-sm hover:bg-gray-400"
                          onClick={() => { setShowNewCategoryInput(false); setNewCategoryName(''); }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {errors.category_name && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.category_name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Description *
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      className={`w-full px-3 py-2 border rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500 ${
                        errors.description ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Brief description for product listing"
                    />
                    {errors.description && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.description}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">Product Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Material</label>
                    <input
                      type="text"
                      name="material"
                      value={formData.material}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Concrete, Fly Ash"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Dimensions</label>
                    <input
                      type="text"
                      name="dimensions"
                      value={formData.dimensions}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., 400 x 200 x 150 mm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Color</label>
                    <input
                      type="text"
                      name="color"
                      value={formData.color}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Grey, Red, Black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Density</label>
                    <input
                      type="text"
                      name="density"
                      value={formData.density}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., 1800-2000 kg/m³"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Compressive Strength</label>
                    <input
                      type="text"
                      name="compressive_strength"
                      value={formData.compressive_strength}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., 4-7 MPa"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Shape</label>
                    <input
                      type="text"
                      name="shape"
                      value={formData.shape}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Rectangular, Square"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Feature</label>
                    <input
                      type="text"
                      name="feature"
                      value={formData.feature}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Crack Resistance, High Strength"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Usage/Application</label>
                    <input
                      type="text"
                      name="usage"
                      value={formData.usage}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Pavement, Road Construction"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Brand</label>
                    <input
                      type="text"
                      name="brand"
                      value={formData.brand}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Manufacturer, Supplier"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Grade</label>
                    <input
                      type="text"
                      name="grade"
                      value={formData.grade}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., AAC Grade, M20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Thermal Conductivity</label>
                    <input
                      type="text"
                      name="thermal_conductivity"
                      value={formData.thermal_conductivity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., 0.24 W/mK"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Water Absorption</label>
                    <input
                      type="text"
                      name="water_absorption"
                      value={formData.water_absorption}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., 10-15 %"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Surface Finish</label>
                    <input
                      type="text"
                      name="surface_finish"
                      value={formData.surface_finish}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Smooth, Textured, Polished"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Reinforcement</label>
                    <input
                      type="text"
                      name="reinforcement"
                      value={formData.reinforcement}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Steel TMT Bars"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Tolerance</label>
                    <input
                      type="text"
                      name="tolerance"
                      value={formData.tolerance}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., ±2 mm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Installation Type</label>
                    <input
                      type="text"
                      name="installation_type"
                      value={formData.installation_type}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., Readymade, Prefab"
                    />
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Weight</label>
                    <input
                      type="text"
                      name="weight"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="e.g., 1.4 Kg, 10 - 20 mm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 sm:space-y-6">
            {/* Product Image */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">Product Image</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <FaUpload className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-xs sm:text-sm text-gray-600">Click to upload image</p>
                    </label>
                  </div>

                  {formData.image_url && (
                    <div className="relative">
                      <img
                        src={formData.image_url}
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
                  )}

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Image URL (Alternative)</label>
                    <input
                      type="url"
                      name="image_url"
                      value={formData.image_url}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4 sm:mb-6">Pricing & Stock</h3>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500 ${
                        errors.price ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="0.00"
                    />
                    {errors.price && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.price}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Price Unit</label>
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
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                      Minimum Order Quantity *
                    </label>
                    <input
                      type="number"
                      name="min_order_quantity"
                      value={formData.min_order_quantity}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg text-xs sm:text-sm hover:border-red-400 focus:border-red-500 ${
                        errors.min_order_quantity ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="100"
                    />
                    {errors.min_order_quantity && <p className="text-xs sm:text-sm text-red-500 mt-1">{errors.min_order_quantity}</p>}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">Minimum Order Unit</label>
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
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-red-400 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-xs sm:text-sm font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white mr-2"></div>
                 </>
              ) : (
                <>
                  <FaSave className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Add Product
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
