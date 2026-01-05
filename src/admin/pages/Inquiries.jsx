import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaEye, 
  FaReply, 
  FaClock,
  FaPhone,
  FaBox,
  FaArrowLeft,
  FaTimes
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAllInquiries } from '../../services/GetInquiries';
import { useNavigate } from 'react-router-dom';

export default function Inquiries() {
  const navigate = useNavigate();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [mobileNo, setMobileNo] = useState('');

  // Fetch all inquiries
  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await GetAllInquiries();
        console.log('Full API response:', response);
        console.log('Inquiry data:', response.data);
        if ( response.data.data) {
          setInquiries(response.data.data);
          console.log('Inquiries set to state:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        // Fallback data for demo
        const fallbackData = [];
        setInquiries(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };



  // Handle inquiry actions
  const handleViewInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowDetailsModal(true);
  };

  const handleReplyInquiry = (inquiry) => {
    toast.info(`Opening reply for ${inquiry.name}'s inquiry`);
    // You can implement reply functionality here
  };

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">All Inquiries</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600">Manage customer inquiries and requests</p>
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-white rounded-lg shadow">
        {loading ? (
          <div className="p-6">
            <div className="space-y-4">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse border-b border-gray-200 pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                      <div>
                        <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-24"></div>
                      </div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {inquiries.length > 0 ? (
              inquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <FaEnvelope className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 mb-1">{inquiry.category_name}</h3>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <FaBox className="w-3 h-3" />
                            <span>{inquiry.quantity} {inquiry.unit}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaPhone className="w-3 h-3" />
                            <span>{inquiry.countryCode} {inquiry.mobno}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock className="w-3 h-3" />
                            <span>{formatDate(inquiry.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewInquiry(inquiry)}
                        className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50 transition-colors"
                        title="View Details"
                      >
                        <FaEye className="w-4 h-4" />
                      </button>
                      {/* <button
                        onClick={() => handleReplyInquiry(inquiry)}
                        className="text-green-600 hover:text-green-800 p-2 rounded-lg hover:bg-green-50 transition-colors"
                        title="Reply"
                      >
                        <FaReply className="w-4 h-4" />
                      </button> */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FaEnvelope className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-sm text-gray-500">No inquiries found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Inquiry Details Modal */}
      {showDetailsModal && selectedInquiry && (
        <div className="fixed inset-0 bg-white/60 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="bg-red-500 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold">Inquiry Details</h2>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="text-white text-sm hover:text-red-200 transition-colors"
                >
                    <FaTimes size={16} />

                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Inquiry ID</label>
                  <p className="text-sm text-gray-900">#{selectedInquiry.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product ID</label>
                  <p className="text-sm text-gray-900">#{selectedInquiry.product_id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                  <p className="text-sm text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <p className="text-sm text-gray-900">{selectedInquiry.countryCode} {selectedInquiry.mobno}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Requested</label>
                  <p className="text-sm text-gray-900">{selectedInquiry.quantity} {selectedInquiry.unit}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date Submitted</label>
                  <p className="text-sm text-gray-900">{formatDate(selectedInquiry.created_at)}</p>
                </div>
                {/* Additional info from API (if available) */}
                {selectedInquiry.product_name && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                    <p className="text-sm text-gray-900">{selectedInquiry.product_name}</p>
                  </div>
                )}
                {selectedInquiry.category_name && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product Category</label>
                    <p className="text-sm text-gray-900">{selectedInquiry.category_name}</p>
                  </div>
                )}
              </div>
              
              <div className="flex gap-4">
               
               
                <button
                  onClick={() => {
    setShowDetailsModal(false);
    window.location.href = `tel:${mobileNo}`;
  }}
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Contact Customer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
