// src/utils/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,  // ✅ all requests use this base
});

export default axiosInstance;