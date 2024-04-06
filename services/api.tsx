// services/api.ts
import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Replace with your actual backend URL

export const sendMessageToAssistant = async (message: string) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message: message });
    return response.data;
  } catch (error) {
    console.error("Error sending message to assistant:", error);
    throw error;
  }
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};