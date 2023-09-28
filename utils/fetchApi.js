import axios from "axios";

const fetchApi = async (url, method = "GET", data = {}, headers = {}) => {
  try {
    const response = await axios({
      method,
      url, 
      data,
      headers,
    });

    return response.data; 
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export default fetchApi;
