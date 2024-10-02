import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILS_API_URL,
});

export default axiosInstance;
