import { apiCall } from "./authService";

export const createProduct = async (productData) => {
  try {
    const response = await apiCall({
      endpoint: "api/products",
      method: "POST",
      requireAuth: true,
      data: productData
    });
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getAllProducts = async ({ page = 1, limit = 10, search = '', category = '' }) => {
  try {
    let endpoint = `api/products?page=${page}&limit=${limit}`;
    
    if (category && category !== 'all') {
      endpoint += `&category=${category}`;
    }
    
    if (search) {
      endpoint += `&search=${encodeURIComponent(search)}`;
    }

    const response = await apiCall({
      endpoint,
      method: "GET",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await apiCall({
      endpoint: `api/products/${productId}`,
      method: "GET",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

export const updateProduct = async (productId, productData) => {
  try {
    const response = await apiCall({
      endpoint: `api/products/${productId}`,
      method: "PUT",
      requireAuth: true,
      data: productData
    });
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await apiCall({
      endpoint: `api/products/${productId}`,
      method: "DELETE",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
