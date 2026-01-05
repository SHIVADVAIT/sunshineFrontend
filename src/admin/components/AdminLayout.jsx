import React, { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import adminPhoto from '../../assets/Team/Director1.png'
import { 
  FaBars, 
  FaTimes, 
  FaHome, 
  FaEnvelope, 
  FaBox, 
  FaPlus, 
  FaUsers, 
  FaChartBar, 
  FaCog,
  FaSignOutAlt,
  FaQuestion
} from 'react-icons/fa';

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FaHome },
    { name: 'Messages', href: '/admin/messages', icon: FaEnvelope },
    { name: 'Inquiries', href: '/admin/inquiries', icon: FaQuestion },
    // { name: 'Products', href: '/admin/products', icon: FaBox },
    // { name: 'Add Product', href: '/admin/add-product', icon: FaPlus },
    { name: 'Settings', href: '/admin/settings', icon: FaCog },
  ];

  const handleLogout = async () => {
  // Remove JWT token and user data from localStorage
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  localStorage.removeItem('adminAuth');
  // Always navigate to login
  navigate('/admin/login');
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 bg-white shadow-lg">
            {/* Sidebar header */}
            <div className="flex items-center h-16 px-4 sm:px-6 border-b border-gray-200">
              <h1 className="text-base sm:text-lg font-bold text-gray-900">Admin Panel</h1>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 px-2 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-red-100 text-red-700 border-r-4 border-red-500'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="px-2 sm:px-4 pb-4 sm:pb-6 border-t border-gray-200 pt-4 sm:pt-6">
              <button 
                className="flex items-center w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors"
                onClick={handleLogout}
              >   
                <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div 
            className="fixed inset-0 bg-transparent bg-opacity-50"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-64 bg-white shadow-lg">
            {/* Mobile sidebar header */}
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200">
              <h1 className="text-base sm:text-lg font-bold text-gray-900">Admin Panel</h1>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
            
            {/* Mobile Navigation */}
            <nav className="flex-1 px-2 sm:px-4 py-4 sm:py-6 space-y-1 sm:space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
                      isActive(item.href)
                        ? 'bg-red-100 text-red-700 border-r-4 border-red-500'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Logout */}
            <div className="px-2 sm:px-4 pb-4 sm:pb-6 border-t border-gray-200 pt-4 sm:pt-6">
              <button 
                className="flex items-center w-full px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-400 hover:text-gray-600"
            >
              <FaBars className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
             </h2>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="relative">
                <img
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full"
                  src={adminPhoto}
                  alt="Admin"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 xl:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
