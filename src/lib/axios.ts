import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RAILS_API_URL,
});

async function setHeader(token: string | undefined) {
  axiosInstance.interceptors.request.use((config) => {
    config.headers['Authorization'] = `Bearer ${token}`;

    return config;
  });
}

export { axiosInstance, setHeader };
