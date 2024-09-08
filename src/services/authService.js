import axios from 'axios';

const API_URL = 'http://localhost:8080'; 

export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth/login`, credentials);
    localStorage.setItem('token', response.data.token);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};
