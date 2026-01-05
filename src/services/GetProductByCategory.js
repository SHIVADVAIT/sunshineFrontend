
import { apiCall } from "./authService";

export const GetProductByCategory = async ({ category }) => {
  try {
    const response = await apiCall({
      endpoint: `api/products?category=${category}`, 
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
};