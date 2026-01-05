// API Base URL - can be configured via environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiCall = async ({ endpoint, method = "GET", payload = null, requireAuth = false, isFormData = false }) => {
  try {
    const config = {
      method,
      headers: {},
    };

    // Add Authorization header only if required or if token exists and route needs auth
    const token = localStorage.getItem('authToken');
    if (requireAuth && token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Handle FormData payload for file uploads
    if (payload && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      if (isFormData) {
        config.body = payload;
        // Do NOT set Content-Type for FormData, browser will set it automatically
      } else {
        config.headers['Content-Type'] = 'application/json';
        config.body = JSON.stringify(payload);
      }
    } else {
      config.headers['Content-Type'] = 'application/json';
    }

    // Construct full URL
    const url = `${API_BASE_URL}/${endpoint}`;

    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { data, status: response.status };

  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

// Authentication service
export const authService = {
  // Login function
  async login(email, password) {
    try {
      const response = await apiCall({
        endpoint: 'api/auth/login',
        method: 'POST',
        payload: { email, password },
        requireAuth: false // Login doesn't require existing auth
      });

      if (response.data.success) {
        // Store token and user data
        localStorage.setItem('authToken', response.data.token);
        
        // Decode JWT to extract user information
        try {
          const tokenPayload = JSON.parse(atob(response.data.token.split('.')[1]));
          const userData = {
            userId: tokenPayload.userId || '1',
            adminId: tokenPayload.adminId || '1',
            userEmailId: tokenPayload.userEmailId || '',
            userName: tokenPayload.userName || '',
            userPhone: tokenPayload.userPhone || '',
            roleType: tokenPayload.roleType || 'admin'
          };
          localStorage.setItem('userData', JSON.stringify(userData));
        } catch (decodeError) {
          console.warn('Could not decode token payload:', decodeError);
          // Fallback to response data
          const userData = {
            userId: '1',
            adminId: '1',
            userEmailId: 'admin@gmail.com',
            userName: '',
            userPhone: '',
            roleType: response.data.roleType || 'admin'
          };
          localStorage.setItem('userData', JSON.stringify(userData));
        }
        
        localStorage.setItem('adminAuth', 'true');
        return response.data;
      } else {
        throw new Error(response.data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Logout function
  async logout() {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        await apiCall({
          endpoint: 'api/auth/logout',
          method: 'POST',
          requireAuth: true // Logout requires auth
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call success
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      localStorage.removeItem('adminAuth');
    }
  },

  // Get current user
  async getCurrentUser() {
    try {
      const response = await apiCall({
        endpoint: 'api/auth/me',
        method: 'GET',
        requireAuth: true // Getting current user requires auth
      });
      return response.data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    const token = localStorage.getItem('authToken');
    const adminAuth = localStorage.getItem('adminAuth');
    return !!(token && adminAuth === 'true');
  },

  // Get stored user data
  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  },

  // Get stored token
  getToken() {
    return localStorage.getItem('authToken');
  },

  // Utility function to make authenticated API calls
  async authenticatedApiCall({ endpoint, method = "GET", payload = null }) {
    return await apiCall({
      endpoint,
      method,
      payload,
      requireAuth: true
    });
  }
};
