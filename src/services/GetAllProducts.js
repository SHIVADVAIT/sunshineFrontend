
import { apiCall } from "./authService";

export const GetAllProducts = async () => {
  try {
    const response = await apiCall({
      endpoint: `api/products`, 
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error('Error fetching products ', error);
    throw error;
  }
};


