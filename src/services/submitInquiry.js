import { apiCall } from "./authService";

export const submitInquiry = async ({payload}) => {
  try {
    const response = await apiCall({
      endpoint: "api/inquiry",
      method: "POST",
      payload: payload
    });
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};