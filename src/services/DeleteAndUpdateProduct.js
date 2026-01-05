import { apiCall } from "./authService";

export const deleteProduct = async (id) => {
  try {
    const response = await apiCall({
      endpoint: `api/products/${id}`,
      method: "DELETE",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const UpdateProducts = async (id, updatedData) => {
  try {
    const response = await apiCall({
      endpoint: `api/products/${id}`,
      method: "PUT",
      requireAuth: true,
      payload: updatedData,
      isFormData: true
    });
    return response;
  } catch (error) {
    console.error('Error updating product ', error);
    throw error;
  }
};