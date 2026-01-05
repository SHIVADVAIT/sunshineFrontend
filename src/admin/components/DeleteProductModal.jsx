import React, { useState } from 'react';
import { FaTimes, FaTrash, FaExclamationTriangle } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { deleteProduct } from '../../services/DeleteAndUpdateProduct';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function DeleteProductModal({ showModal, product, onClose, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  const handleDelete = async () => {
    if (confirmText !== 'DELETE') {
      toast.error('Please type "DELETE" in capital letters to confirm');
      return;
    }

    setIsDeleting(true);
    
    try {
      const response = await deleteProduct(product.id);
      if (response.data.success) {
        onDelete(product.id);
        toast.success(`${product.product_name} deleted successfully!`);
        onClose();
      }
    } catch (error) {
      toast.error('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
      setConfirmText('');
    }
  };

  const handleClose = () => {
    setConfirmText('');
    onClose();
  };

  if (!showModal || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center p-3 sm:p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col relative z-[60]">
        {/* Fixed Modal Header */}
        <div className="bg-gradient-to-r from-red-400 to-red-500 text-white p-3 sm:p-4 rounded-t-xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FaTrash className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              <div>
                <h2 className="text-sm sm:text-base font-bold">Delete Product</h2>
                <p className="text-xs sm:text-sm text-red-100 mt-1">
                  This action cannot be undone
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-red-200 transition-colors p-1"
            >
              <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="flex-1 p-4 sm:p-6">
          {/* Warning Icon and Message */}
          <div className="text-center mb-6">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <FaExclamationTriangle className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              Delete Product?
            </h3>
            <p className="text-sm sm:text-base text-gray-600">
              This action will permanently remove this product from your system.
            </p>
          </div>

          {/* Product Info Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-1 mb-2">
            <div className="flex items-center space-x-4">
              <img
                src={`${API_BASE}${product.image_url}`}
                alt={product.product_name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                  {product.product_name}
                </h4>
                <p className="text-sm sm:text-base text-gray-600 mt-1">
                  {product.description}
                </p>
                <div className="flex items-center space-x-3 mt-2">
                  <span className="text-sm sm:text-base font-semibold text-red-600">
                    ₹{product.price} per {product.unit}
                  </span>
                  <span className="text-sm sm:text-base text-gray-500 capitalize">
                    {product.category_name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Confirmation Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Type <span className="font-bold text-red-600">"DELETE"</span> to confirm:
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              placeholder="Type DELETE to confirm"
            />
          </div>

          {/* Warning Box */}
          {/* <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6"> */}
            {/* <div className="flex">
              <FaExclamationTriangle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800 mb-2">
                  Warning: This action cannot be undone
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Product will be removed from catalog</li>
                  <li>• All product data will be deleted</li>
                  <li>• Customer access will be revoked</li>
                </ul>
              </div>
            </div> */}
          {/* </div> */}
        </div>

        {/* Fixed Modal Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-xl">
          <div className="flex justify-end space-x-3">
            <button
              onClick={handleClose}
              className="px-6 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting || confirmText !== 'DELETE'}
              className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg transition-colors flex items-center text-sm font-medium"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <FaTrash className="w-4 h-4 mr-2" />
                  Delete Product
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
