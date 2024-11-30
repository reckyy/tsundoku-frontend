import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_RAILS_API_URL;

export async function clientAxiosGet(url: string, token: string | undefined) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.get(`${BASE_URL}${url}`, { headers });
}

export async function clientAxiosPost<B>(
  url: string,
  token: string | undefined,
  body: B,
) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.post(`${BASE_URL}${url}`, body, { headers });
}

export async function clientAxiosPatch<B>(
  url: string,
  token: string | undefined,
  body: B,
) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.patch(`${BASE_URL}${url}`, body, { headers });
}

export async function clientAxiosDelete(
  url: string,
  token: string | undefined,
) {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return await axios.delete(`${BASE_URL}${url}`, { headers });
}
