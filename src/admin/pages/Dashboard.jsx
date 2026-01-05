import React, { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaBox, 
  FaUsers, 
  FaChartLine,
  FaEye,
  FaReply,
  FaPlus,
  FaClock,
  FaArrowRight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetRecentInquiries } from '../../services/GetInquiries';
import { GetAllProducts } from '../../services/GetAllProducts';
import { GetAllInquiries } from '../../services/GetInquiries';
import { getTotalMessages } from '../../services/AdminMessage';




export default function Dashboard() {
  const navigate = useNavigate();
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalInquiries, setTotalInquiries] = useState(0);
  const [totalMessages, setTotalMessages]= useState(0);

  const fetchTotalMessages = async () => {
    try {
      const response = await getTotalMessages();
      console.log("My total contact response is ", response);
      if (response.data.success) {
        
        setTotalMessages(response.data.pagination.total);
        console.log("total messages", response.data.total_count);
      }
    } catch (error) {
      console.error('Error fetching total messages:', error);
    }
  };
  useEffect(() => {
    fetchTotalMessages();
  }, []);

  const fetchTotalInquiries = async () => {
    try {
      const response = await GetAllInquiries();
      if(response.data.success){
        setTotalInquiries(response.data.total_count);
        console.log("total inquiries", response.data.total_count)
      }
      if(response.success){
        
      }
    } catch (error) {
      console.error('Error fetching total inquiries:', error);
    }
  };
  useEffect(() => {
    fetchTotalInquiries();
  }, []);

 const fetchTotalCount = async ()=>{
  try{
   const response = await GetAllProducts();
   console.log("My actual response ", response.data);
   if(response.data.success){
    console.log("My total count is ",response.data.count);
    setTotalProducts(response.data.count);
   }
  } catch (error) {
    console.error('Error fetching total count:', error);
  }
 }

 useEffect(() => {
  
   fetchTotalCount();
 }, []);

    const fetchInquiries = async () => {
      try {
        const response = await GetRecentInquiries(6);
        console.log('Dashboard API response:', response);
        if (response.data && response.data.success && response.data.data) {
          setRecentInquiries(response.data.data);
          console.log('Recent inquiries set to state:', response.data.data);
        }
      } catch (error) {
        console.error('Error fetching inquiries:', error);
        // Fallback data for demo - using API structure
        setRecentInquiries([]);
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {fetchInquiries();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };



  const stats = [
    {
      name: 'Total Messages',
      value: totalMessages,
      changeType: 'increase',
      icon: FaEnvelope,
      color: 'bg-blue-500'
    },
    {
      name: 'Products',
      value: totalProducts,
      changeType: 'increase',
      icon: FaBox,
      color: 'bg-green-500'
    },
    {
      name: 'Inquiries',
      value: totalInquiries,
      changeType: 'increase',
      icon: FaUsers,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600">Welcome to SunShine Enterprises Admin Panel</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white rounded-lg shadow p-3 sm:p-4 lg:p-6">
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-2 sm:p-3`}>
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <p className={`ml-2 text-xs sm:text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.change}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">Recent Inquiries</h3>
            <button
              onClick={() => {
                toast.info('Navigating to All Inquiries...');
                navigate('/admin/inquiries');
              }}
              className="text-red-500 hover:text-red-600 text-xs sm:text-sm font-medium flex items-center gap-1 transition-colors"
            >
              Show More
              <FaArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div className="p-3 sm:p-4 lg:p-6">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                        <div>
                          <div className="h-4 bg-gray-200 rounded w-24 mb-1"></div>
                          <div className="h-3 bg-gray-200 rounded w-16"></div>
                        </div>
                      </div>
                      <div className="h-6 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {recentInquiries.length > 0 ? (
                  recentInquiries.map((inquiry) => (
                    <div 
                      key={inquiry.id} 
                      className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all cursor-pointer"

                      >
                      <div className="flex items-center space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center">
                          <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-gray-900">{inquiry.name}</p>
                          <div className="flex items-center gap-2 text-[11px] sm:text-xs text-gray-500">
                            <span>{inquiry.product_name}</span>
                            <span>•</span>
                            <span>{inquiry.quantity} {inquiry.unit}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[11px] sm:text-xs text-gray-400">
                            <FaClock className="w-2 h-2 sm:w-3 sm:h-3" />
                            <span>{formatDate(inquiry.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FaEnvelope className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs sm:text-sm text-gray-500">No inquiries yet</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">Quick Actions</h3>
          </div>
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="space-y-3 sm:space-y-4">
              <button 
                onClick={() => {
                  toast.info('Navigating to Add Product...');
                  navigate('/admin/add-product');
                }}
                className="w-full bg-blue-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-xs sm:text-sm font-medium"
              >
                <FaPlus className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Add New Product
              </button>
              <button 
                onClick={() => {
                  toast.info('Navigating to Messages...');
                  navigate('/admin/messages');
                }}
                className="w-full bg-green-500 text-white py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center text-xs sm:text-sm font-medium"
              >
                <FaEnvelope className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Check Messages
              </button>
            </div>
          </div>
        </div>
      </div>

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
