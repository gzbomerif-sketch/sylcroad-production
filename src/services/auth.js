import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://sylcroad.com/api';

export const authService = {
  login: async (provider, token) => {
    const response = await axios.post(`${API_URL}/auth.php`, {
      provider,
      token
    });
    return response.data;
  },

  verifyToken: async (token) => {
    const response = await axios.get(`${API_URL}/auth.php?verify=1`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

