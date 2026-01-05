import { apiCall } from "./authService";

export const GetAllInquiries = async () => {
  try {
    const response = await apiCall({
      endpoint: "api/inquiries",
      method: "GET",
      requireAuth: true, // Ensure this endpoint requires authentication
    });
    return response;
  } catch (error) {
    console.error("Error fetching inquiries:", error);
    throw error;
  }
};

export const GetRecentInquiries = async (limit = 6) => {
  try {
    const response = await apiCall({
      endpoint: `api/inquiries?limit=${limit}`,
      method: "GET",
      requireAuth: true, // Ensure this endpoint requires authentication
    });
    return response;
  } catch (error) {
    console.error("Error fetching recent inquiries:", error);
    throw error;
  }
};
