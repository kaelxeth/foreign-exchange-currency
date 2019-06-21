import Axios, { AxiosInstance } from 'axios';
import { API_BASE_URL } from './serviceConstants';

export const Service: AxiosInstance = Axios.create({
  baseURL: API_BASE_URL
});

export default Service;