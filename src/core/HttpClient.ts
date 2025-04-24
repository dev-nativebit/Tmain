import axios, {AxiosInstance} from 'axios';
import {Storage} from '@/core/Storage';
import {logger} from '@/logger/Logger';

export const getHttpClient = (baseURL: string): AxiosInstance => {
  const http = axios.create({
    baseURL,
    timeout: 1000 * 30 * 4, // Wait for 30 seconds
    headers: {
      accept: 'application/json',
      'Content-Type': 'multipart/form-data; ',
    },
  });
  http.interceptors.request.use(async function (config) {
    const token = await Storage.getItemAsync(Storage.keys.authToken);
    const sign = await Storage.getItemAsync(Storage.keys.sign);
    logger.info('TOKEN', token);
    logger.info('sign', sign);
    const url = config.url;
    config.headers.authToken = token;
    config.headers.sign = sign;
    return config;
  });

  http.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log('error', JSON.stringify(error, undefined, 4));
      if (error.response && error.response.status === 401) {
        const {url, method, headers, data} = error.config;
        console.log('Original request URL:', url);
        console.log('Original request method:', method);
        console.log('Original request headers:', headers);
        console.log('Original request data:', data);
        return Promise.reject('Unauthorized');
      }
      // Handle other errors here
      return Promise.reject(error);
    },
  );

  return http;
};
