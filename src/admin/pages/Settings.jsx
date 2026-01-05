import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserSettings, updateUserSettings } from '../../services/Settings';
import { 
  FaSave, 
  FaUser, 
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaCheck
} from 'react-icons/fa';

export default function Settings() {
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    email: '',
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Fetch user settings on component mount
  useEffect(() => {
    fetchUserSettings();
  }, []);

  const fetchUserSettings = async () => {
    try {
      setIsLoading(true);
      const response = await getUserSettings();
      if (response.data && response.data.success && response.data.data) {
        setSettings(prev => ({
          ...prev,
          email: response.data.data.email || '',
          role: response.data.data.role || 'admin' // Default to admin if no role
        }));
      }
    } catch (error) {
      toast.error('Failed to load settings');
      console.error('Error fetching settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Validation
      if (!settings.email) {
        toast.error('Email is required');
        setIsSaving(false);
        return;
      }

      if (!settings.role) {
        toast.error('Role is required');
        setIsSaving(false);
        return;
      }
      
      if (settings.newPassword) {
        if (!settings.currentPassword) {
          toast.error('Current password is required');
          setIsSaving(false);
          return;
        }
        if (settings.newPassword !== settings.confirmPassword) {
          toast.error('New passwords do not match');
          setIsSaving(false);
          return;
        }
        if (settings.newPassword.length < 8) {
          toast.error('Password must be at least 8 characters long');
          setIsSaving(false);
          return;
        }
      }

      // Prepare data for API
      const settingsData = {
        email: settings.email,
        role: settings.role,
        currentPassword: settings.currentPassword,
        newPassword: settings.newPassword,
        confirmPassword: settings.confirmPassword
      };

      const response = await updateUserSettings(settingsData);
      
      if (response.data && response.data.success) {
        toast.success('Settings updated successfully!');
        
        // Reset password fields after successful save
        setSettings(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
      } else {
        toast.error(response.data?.message || 'Failed to update settings');
      }
      
    } catch (error) {
      toast.error('Failed to save settings. Please try again.');
      console.error('Error updating settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Handle file upload if needed
        console.log('File selected:', file.name);
      };
      reader.readAsDataURL(file);
    }
  };

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
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-1">Manage your application settings and preferences</p>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            <span className="ml-2 text-gray-600">Loading settings...</span>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
          <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-0">Account Settings</h3>
          <button
            onClick={() => handleSave()}
            disabled={isSaving}
            className="bg-red-500 hover:bg-red-600 disabled:bg-red-400 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors flex items-center text-xs sm:text-sm"
          >
            {isSaving ? (
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

        <div className="space-y-4 sm:space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <FaEnvelope className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Email Address
            </label>
            <input
              type="email"
              value={settings.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent hover:border-red-400 transition-colors text-xs sm:text-sm"
            />
          </div>

          {/* Role Field */}
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
              <FaUser className="inline w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Role
            </label>
            <select
              value={settings.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent hover:border-red-400 transition-colors text-xs sm:text-sm"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Password Change Section */}
          <div className="border-t border-gray-200 pt-4 sm:pt-6">
            <h4 className="text-sm sm:text-base font-medium text-gray-900 mb-4">Change Password</h4>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.current ? 'text' : 'password'}
                    value={settings.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent hover:border-red-400 transition-colors text-xs sm:text-sm"
                    placeholder="Enter current password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.current ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.new ? 'text' : 'password'}
                    value={settings.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent hover:border-red-400 transition-colors text-xs sm:text-sm"
                    placeholder="Enter new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.new ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword.confirm ? 'text' : 'password'}
                    value={settings.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent hover:border-red-400 transition-colors text-xs sm:text-sm"
                    placeholder="Confirm new password"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword.confirm ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {settings.newPassword && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4">
                  <h4 className="text-xs sm:text-sm font-medium text-yellow-800 mb-1 sm:mb-2">Password Requirements:</h4>
                  <ul className="text-xs sm:text-sm text-yellow-700 space-y-1">
                    <li className="flex items-center">
                      <FaCheck className={`w-3 h-3 mr-2 ${settings.newPassword.length >= 8 ? 'text-green-600' : 'text-gray-400'}`} />
                      At least 8 characters long
                    </li>
                    <li className="flex items-center">
                      <FaCheck className={`w-3 h-3 mr-2 ${/[A-Z]/.test(settings.newPassword) && /[a-z]/.test(settings.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                      Include uppercase and lowercase letters
                    </li>
                    <li className="flex items-center">
                      <FaCheck className={`w-3 h-3 mr-2 ${/\d/.test(settings.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                      Include at least one number
                    </li>
                    <li className="flex items-center">
                      <FaCheck className={`w-3 h-3 mr-2 ${/[!@#$%^&*(),.?":{}|<>]/.test(settings.newPassword) ? 'text-green-600' : 'text-gray-400'}`} />
                      Include at least one special character
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          </div>
        </div>
      )}
    </div>
  );
}