import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  FaChartLine, 
  FaUsers, 
  FaEye, 
  FaEnvelope,
  FaArrowUp,
  FaArrowDown,
  FaDownload,
  FaSync,
  FaShare
} from 'react-icons/fa';

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 12 months');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshData = async () => {
    setIsRefreshing(true);
    toast.info('Refreshing analytics data...', {
      autoClose: 1000,
    });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsRefreshing(false);
    toast.success('Analytics data updated successfully!');
  };

  const handleExportData = () => {
    toast.info('Preparing export...', {
      autoClose: 1000,
    });
    
    // Simulate export process
    setTimeout(() => {
      toast.success('Analytics report exported successfully!');
    }, 1500);
  };

  const handleShareReport = () => {
    toast.info('Generating shareable link...', {
      autoClose: 1000,
    });
    
    setTimeout(() => {
      toast.success('Shareable link copied to clipboard!');
    }, 1500);
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
};
  const analyticsData = {
    totalViews: 543,
    uniqueVisitors: 8765,
    totalInquiries: 234,
    conversionRate: 2.8,
    topProducts: [
      { name: 'Paver Blocks', views: 3456, inquiries: 45 },
      { name: 'Fly Ash Bricks', views: 2890, inquiries: 38 },
      { name: 'Precast Boundary Wall', views: 2234, inquiries: 29 },
      { name: 'CconBlocks', views: 1876, inquiries: 24 },
      { name: 'Kerb Stone', views: 1543, inquiries: 19 }
    ],
    monthlyData: [
      { month: 'Jan', views: 980, inquiries: 15 },
      { month: 'Feb', views: 1245, inquiries: 22 },
      { month: 'Mar', views: 1567, inquiries: 28 },
      { month: 'Apr', views: 1890, inquiries: 35 },
      { month: 'May', views: 2134, inquiries: 42 },
      { month: 'Jun', views: 2456, inquiries: 48 },
      { month: 'Jul', views: 2789, inquiries: 54 }
    ]
  };

  const stats = [
    {
      name: 'Total Page Views',
      value: analyticsData.totalViews.toLocaleString(),
      change: '+12.5%',
      changeType: 'increase',
      icon: FaEye,
      color: 'bg-blue-500'
    },
    {
      name: 'Unique Visitors',
      value: analyticsData.uniqueVisitors.toLocaleString(),
      change: '+8.2%',
      changeType: 'increase',
      icon: FaUsers,
      color: 'bg-green-500'
    },
    {
      name: 'Total Inquiries',
      value: analyticsData.totalInquiries.toLocaleString(),
      change: '+15.3%',
      changeType: 'increase',
      icon: FaEnvelope,
      color: 'bg-purple-500'
    },
    {
      name: 'Conversion Rate',
      value: `${analyticsData.conversionRate}%`,
      change: '+0.4%',
      changeType: 'increase',
      icon: FaChartLine,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div>
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
      
      {/* Page header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">Monitor your website performance and user engagement</p>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
            <button 
              onClick={handleRefreshData}
              disabled={isRefreshing}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center text-xs sm:text-sm"
            >
              <FaSync className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              {isRefreshing ? 'Refreshing...' : 'Refresh'}
            </button>
            <button 
              onClick={handleExportData}
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center text-xs sm:text-sm"
            >
              <FaDownload className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Export
            </button>
            <button 
              onClick={handleShareReport}
              className="bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center text-xs sm:text-sm"
            >
              <FaShare className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div 
              key={stat.name} 
              className="bg-white rounded-lg shadow p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => toast.info(`Viewing details for ${stat.name}`)}
            >
              <div className="flex items-center">
                <div className={`${stat.color} rounded-lg p-2 sm:p-3`}>
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <p className="text-xs sm:text-sm font-medium text-gray-600">{stat.name}</p>
                  <div className="flex items-baseline">
                    <p className="text-lg sm:text-2xl font-semibold text-gray-900">{stat.value}</p>
                    <div className={`ml-2 flex items-center text-xs sm:text-sm font-medium ${
                      stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stat.changeType === 'increase' ? (
                        <FaArrowUp className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                      ) : (
                        <FaArrowDown className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                      )}
                      {stat.change}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-0">Monthly Trends</h3>
            <select 
              className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-xs sm:text-sm hover:border-red-400 transition-colors"
              value={selectedPeriod}
              onChange={(e) => handlePeriodChange(e.target.value)}
            >
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {analyticsData.monthlyData.map((data, index) => (
              <div 
                key={data.month} 
                className="flex items-center justify-between hover:bg-gray-50 p-2 rounded-lg transition-colors cursor-pointer"
                onClick={() => toast.info(`${data.month}: ${data.views} views, ${data.inquiries} inquiries`)}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <span className="text-xs sm:text-sm font-medium text-gray-900 w-6 sm:w-8">{data.month}</span>
                  <div className="flex-1">
                    <div className="bg-gray-200 rounded-full h-2 w-24 sm:w-32">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(data.views / 3000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {data.views} views, {data.inquiries} inquiries
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h3 className="text-base sm:text-lg font-medium text-gray-900">Top Performing Products</h3>
            <button 
              onClick={() => toast.success('Product performance data refreshed!')}
              className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 transition-colors"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div 
                key={product.name} 
                className="flex items-center justify-between p-2 sm:p-3 border border-gray-200 rounded-lg hover:border-red-400 hover:bg-red-50 transition-all cursor-pointer"
                onClick={() => toast.info(`${product.name}: ${product.views} views, ${product.inquiries} inquiries`)}
              >
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-red-600">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-900">{product.name}</p>
                    <p className="text-[11px] sm:text-xs text-gray-500">{product.views} views</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs sm:text-sm font-medium text-gray-900">{product.inquiries}</p>
                  <p className="text-[11px] sm:text-xs text-gray-500">inquiries</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="mt-6 sm:mt-8 bg-white rounded-lg shadow p-4 sm:p-6">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900">Traffic Sources</h3>
          <button 
            onClick={() => toast.info('Traffic source analysis updated!')}
            className="text-xs sm:text-sm text-blue-500 hover:text-blue-700 transition-colors"
          >
            Analyze
          </button>
        </div>
        
        <div className="grid  grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div 
            className="text-center p-3 sm:p-4 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer"
            onClick={() => toast.success('Direct traffic: 5,643 visitors (45%)')}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaChartLine className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
            </div>
            <h4 className="text-sm sm:text-lg font-semibold text-gray-900">Direct</h4>
            <p className="text-lg sm:text-2xl font-bold text-blue-600">45%</p>
            <p className="text-xs sm:text-sm text-gray-500">5,643 visitors</p>
          </div>
          
          <div 
            className="text-center p-3 sm:p-4 rounded-lg hover:bg-green-50 transition-colors cursor-pointer"
            onClick={() => toast.success('Social media traffic: 4,387 visitors (35%)')}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaUsers className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
            </div>
            <h4 className="text-sm sm:text-lg font-semibold text-gray-900">Social Media</h4>
            <p className="text-lg sm:text-2xl font-bold text-green-600">35%</p>
            <p className="text-xs sm:text-sm text-gray-500">4,387 visitors</p>
          </div>
          
          <div 
            className="text-center p-3 sm:p-4 rounded-lg hover:bg-purple-50 transition-colors cursor-pointer"
            onClick={() => toast.success('Search engine traffic: 2,507 visitors (20%)')}
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FaEye className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
            </div>
            <h4 className="text-sm sm:text-lg font-semibold text-gray-900">Search Engine</h4>
            <p className="text-lg sm:text-2xl font-bold text-purple-600">20%</p>
            <p className="text-xs sm:text-sm text-gray-500">2,507 visitors</p>
          </div>
        </div>
      </div>
    </div>
  );
}
