import { apiCall } from "./authService";

export const getAllMessages = async ({ page , limit , search , status  }) => {
  try {
    let endpoint = `api/contact?page=${page}&limit=${limit}`;
    
    if (status && status !== 'all') {
      endpoint += `&status=${status}`;
    }
    
    if (search) {
      endpoint += `&search=${encodeURIComponent(search)}`;
    }

    const response = await apiCall({
      endpoint,
      method: "GET",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
};

export const ReplyMessages = async ({ replyData }) => {
  try {
    const response = await apiCall({
      endpoint: `api/contact/reply`,
      method: "POST",
      requireAuth: true,
      payload: replyData
    });
    return response;
  } catch (error) {
    console.error("Error replying to message:", error);
    throw error;
  }
};

export const DeleteMessages = async (id) => {
  try {
    const response = await apiCall({
      endpoint: `api/delete/reply/${id}`,
      method: "DELETE",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
};

export const getTotalMessages = async ()=>{
  try {
    const response = await apiCall({
      endpoint: `api/contact`,
      method: "GET",
      requireAuth: true
    });
    return response;
  } catch (error) {
    console.error("Error fetching total messages:", error);
    throw error;
  }
}
