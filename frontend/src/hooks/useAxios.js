import { useState } from 'react';
import axios from 'axios';

export default function useAxios() {
  const [loading, setLoading] = useState(false);
  const axiosInstance = axios.create({
    baseURL:
      process.env.REACT_APP_NODE_ENV === 'dev'
        ? process.env.REACT_APP_DEV_BACKEND_BASE_URL
        : process.env.REACT_APP_PROD_BACKEND_BASE_URL,
  });

  const fetchData = async ({
    endpoint,
    method = 'POST',
    data = null,
    headers = {},
  }) => {
    setLoading(true);
    try {
      const result = await axiosInstance({
        url: endpoint,
        method,
        data,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...headers,
        },
        withCredentials: true,
      });
      setLoading(false);
      return result;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  return { fetchData, loading };
}
