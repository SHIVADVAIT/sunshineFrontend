
import { apiCall } from "./authService";

export const GetAllCategories = async () => {
  try {
    const response = await apiCall({
      endpoint: `api/categories`, 
      method: "GET",
    });
    return response;
  } catch (error) {
    console.error('Error fetching categories ', error);
    throw error;
  }
};