import React, { useState, useEffect } from 'react';
import { 
  FaEdit, 
  FaTrash, 
  FaEye, 
  FaPlus,
  FaFilter,
  FaSearch,
  FaToggleOn,
  FaToggleOff,
  FaBox
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ViewProductModal from '../components/ViewProductModal';
import EditProductModal from '../components/EditProductModal';
import DeleteProductModal from '../components/DeleteProductModal';
import { GetProductsByPagination } from '../../services/GetProductsbyPagination';
import { GetAllCategories } from '../../services/AdminProduct';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Modal states
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ value: 'all', label: 'All Categories', count: 0 }]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  // Store grand_total from products API
  const [grandTotal, setGrandTotal] = useState(0);

  // Fetch products from backend
  async function fetchProducts() {
    setLoading(true);
    try {
      const response = await GetProductsByPagination(page, limit, selectedCategory !== 'all' ? selectedCategory : undefined, searchTerm);
      if (response.data.success) {
        setProducts(response.data.data);
        setGrandTotal(response.data.grand_total || 0);
      } else {
        setProducts([]);
        setGrandTotal(0);
      }
    } catch (err) {
      toast.error('Failed to fetch products');
      setProducts([]);
      setGrandTotal(0);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm, page, limit]);

  // Fetch categories from backend, use grandTotal for "All Categories"
  async function fetchCategories() {
    try {
      const response = await GetAllCategories();
      if (response.data.success) {
        const cats = response.data.data.map(cat => ({
          value: cat.slug,
          label: cat.name,
          count: products.filter(p => p.category_slug === cat.slug).length
        }));
        setCategories([{ value: 'all', label: 'All Categories', count: grandTotal }, ...cats]);
      }
    } catch (err) {
      toast.error('Failed to fetch categories');
    }
  }
  useEffect(() => {
    fetchCategories();
  }, [products, grandTotal]);

  // Status color based on is_active
  const getStatusColor = (isActive) => {
    return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  // Stock color logic can be customized if you add stock info to backend
  const getStockColor = () => 'bg-gray-100 text-gray-800';

  // Toggle product status locally (for demo); ideally, call backend to update
  const toggleProductStatus = (productId) => {
    const product = products.find(p => p.id === productId);
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, is_active: !p.is_active }
          : p
      )
    );
    toast.success(`${product.product_name} ${!product.is_active ? 'activated' : 'deactivated'} successfully!`);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowViewModal(true);
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDeleteProduct = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  const handleSaveProduct = (updatedProduct) => {
  // After editing, refresh products from backend
  fetchProducts();
  };

  const handleConfirmDelete = (productId) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Products</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage your product catalog</p>
          </div>
         
        </div>
      </div>

      {/* Category Tabs */}
      <div className="mb-4 flex gap-2">
        {categories.map(cat => (
          <button
            key={cat.value}
            className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium ${selectedCategory === cat.value ? 'bg-red-400 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setSelectedCategory(cat.value)}
          >
            {cat.label} ({cat.count})
          </button>
        ))}
      </div>

      {/* Search and filters */}
      <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3 sm:w-4 sm:h-4" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Products List */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6">
            {loading ? (
              <div className="text-center py-8 sm:py-12">Loading products...</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {products.map((product) => (
                  <div 
                    key={product.id} 
                    onClick={() => {
                      setSelectedProduct(product);
                    }}
                    className="bg-gray-50 rounded-lg p-3 sm:p-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    {/* Product Image */}
                    <div className="aspect-w-16 aspect-h-9 mb-3 sm:mb-4">
                      <img
                        src={`${API_BASE}${product.image_url}`}
                        alt={product.product_name}
                        className="w-full h-32 sm:h-40 object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-1">
                          {product.product_name}
                        </h3>
                        <div className="flex items-center space-x-1">
                          <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(product.is_active)}`}>
                            {product.is_active ? 'active' : 'inactive'}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-gray-500">{product.description}</p>

                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm font-bold text-gray-900">₹{product.price} per {product.unit}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStockColor()}`}>
                          {/* Stock info can be added if available */}
                          {product.min_order_quantity ? `${product.min_order_quantity} ${product.min_order_unit}` : ''}
                        </span>
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Modified: {product.updated_at ? product.updated_at.split('T')[0] : ''}</span>
                        {/* Views can be added if available */}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-3 sm:mt-4 flex justify-between items-center">
                      <div className="flex space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewProduct(product);
                          }}
                          className="text-blue-600 hover:text-blue-800 p-1"
                          title="View Product"
                        >
                          <FaEye className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditProduct(product);
                          }}
                          className="text-green-600 hover:text-green-800 p-1"
                          title="Edit Product"
                        >
                          <FaEdit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteProduct(product);
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                          title="Delete Product"
                        >
                          <FaTrash className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleProductStatus(product.id);
                        }}
                        className={`p-1 ${product.is_active ? 'text-green-600' : 'text-gray-400'}`}
                        title={`${product.is_active ? 'Deactivate' : 'Activate'} Product`}
                      >
                        {product.is_active ? (
                          <FaToggleOn className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <FaToggleOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button> */}
                    </div>
                  </div>
                ))}
              </div>
            )}

            { products.length === 0 && !loading && (
              <div className="text-center py-8 mt-3 sm:py-12">
                <FaBox className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-xs sm:text-sm text-gray-500">No products found</p>
              </div>
            )}
            <div className="flex justify-end items-center gap-2 mb-4">
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-xs sm:text-sm">Page {page}</span>
        <button
          className="px-3 py-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
          onClick={() => setPage(prev => prev + 1)}
          disabled={products.length < limit}
        >
          Next
        </button>
        <select
          className="ml-2 px-2 py-1 rounded border text-xs sm:text-sm"
          value={limit}
          onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span className="text-xs sm:text-sm">per page</span>
      </div>
          </div>
        </div>

        {/* Product Actions Sidebar */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <h3 className="text-base sm:text-lg font-medium text-gray-900">Quick Actions</h3>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <Link
                to="/admin/add-product"
                onClick={() => toast.info('Navigating to Add Product...')}
                className="w-full bg-red-400 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-red-500 transition-colors text-xs sm:text-sm font-medium flex items-center justify-center"
              >
                <FaPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Add New Product
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Total Products</label>
                  <p className="text-xs sm:text-sm text-gray-900">{products.length}</p>
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700">Active Products</label>
                  <p className="text-xs sm:text-sm text-gray-900">{products.filter(p => p.is_active).length}</p>
                </div>
                {/* Low Stock Items logic can be added if backend provides stock info */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination Controls */}
      

      {/* Modals */}
      <ViewProductModal 
        showModal={showViewModal}
        product={selectedProduct}
        onClose={() => setShowViewModal(false)}
      />
      
      <EditProductModal 
        showModal={showEditModal}
        product={selectedProduct}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveProduct}
      />
      
      <DeleteProductModal 
        showModal={showDeleteModal}
        product={selectedProduct}
        onClose={() => setShowDeleteModal(false)}
        onDelete={handleConfirmDelete}
      />

      <ToastContainer 
        position="top-right" 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
