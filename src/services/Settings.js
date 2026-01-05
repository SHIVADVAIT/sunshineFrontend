import { apiCall } from "./authService";

// Get current user settings
export const getUserSettings = async () => {
  try {
    const response = await apiCall({
      endpoint: "api/settings/",
      method: "GET",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error("Error fetching user settings:", error);
    throw error;
  }
};

// Update user settings
export const updateUserSettings = async (settingsData) => {
  try {
    const response = await apiCall({
      endpoint: "api/settings/",
      method: "PUT",
      requireAuth: true,
      payload: settingsData
    });
    return response;
  } catch (error) {
    console.error("Error updating user settings:", error);
    throw error;
  }
};
