import axios from 'axios';
import { BASE_API_ADMIN } from './constant';
import { getToken } from './auth';

const token = getToken();

const AxiosInstance = axios.create({
  baseURL: BASE_API_ADMIN,
  headers: {
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

AxiosInstance.interceptors.request.use(
  (req) => {
    const token = getToken();
    if (token) {
      req.headers["Authorization"] = 'Bearer ' + token;
    }
    return req;
  },
  (error) => {
    console.log("error", error);
    return Promise.reject(error);
  }
);

export default AxiosInstance;