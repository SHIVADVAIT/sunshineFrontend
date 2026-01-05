import { apiCall } from "./authService";

export const submitContactForm = async ({ contact }) => {
  try {
    const response = await apiCall({
      endpoint: "api/contact",
      method: "POST",
      payload: contact,
    });
    return response;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};