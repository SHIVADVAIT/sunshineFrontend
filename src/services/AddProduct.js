import { apiCall } from "./authService";

export const createProduct = async (formData) => {
  try {
    const response = await apiCall({
      endpoint: "api/products",
      method: "POST",
      requireAuth: true,
      payload: formData,
      isFormData: true,
    });
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};