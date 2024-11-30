import axios from 'axios';
import { auth } from '@/auth';

const BASE_URL = process.env.NEXT_PUBLIC_RAILS_API_URL;

async function getHeaders() {
  const session = await auth();
  const token = session?.user?.accessToken ?? '';
  return {
    Authorization: `Bearer ${token}`,
  };
}

export async function axiosGet(url: string) {
  const headers = await getHeaders();
  return await axios.get(`${BASE_URL}${url}`, { headers });
}
