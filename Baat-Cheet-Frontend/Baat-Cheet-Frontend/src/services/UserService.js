import { httpClient } from "../config/AxiosHelper";

export const signupUser = async (username, password) => {
  try {
    const response = await httpClient.post("/api/user/create", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Signup failed" };
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await httpClient.post("/api/user/enter", {
      username,
      password,
    });
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: "Login failed" };
  }
};
