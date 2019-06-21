import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_GET_LATEST } from './serviceConstants';
import { RatesLatestResponse } from './service.type';

export const Service: AxiosInstance = Axios.create({
  baseURL: API_BASE_URL
});

export const getLatestRates = (opts: AxiosRequestConfig) => Service.get(API_GET_LATEST, {
  ...opts
}).then(({ data }: { data: RatesLatestResponse }) => data);

export default Service;