
import { apiCall } from "./authService";

// Accepts page, limit, category, and searchTerm for flexible backend filtering
export const GetProductsByPagination = async (page, limit, category, searchTerm) => {
  try {
    let endpoint = `api/products?page=${page}&limit=${limit}`;
    if (category && category !== 'all') {
      endpoint += `&category=${encodeURIComponent(category)}`;
    }
    if (searchTerm && searchTerm.trim() !== '') {
      endpoint += `&search=${encodeURIComponent(searchTerm)}`;
    }
    const response = await apiCall({
      endpoint,
      method: "GET",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error('Error fetching products ', error);
    throw error;
  }
};