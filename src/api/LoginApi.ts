import {HttpPost, ResultCommonInterfaces} from '@/Interfaces';
import {http, Result} from '@/core';
import {LOGIN} from '@/api/EndPoint';
import {AxiosRequestConfig} from 'axios';

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'multipart/form-data; ',
  },
};

export interface LoginApiParams {
  user_name: string;
  user_psw: string;
}

class LoginApi implements HttpPost<ResultCommonInterfaces> {
  post = async (
    params: LoginApiParams,
    formData: FormData,
  ): Promise<Result<ResultCommonInterfaces>> => {
    formData.append('user_name', params.user_name);
    formData.append('user_psw', params.user_psw);
    return http.post(LOGIN(), formData, config);
  };
}

export const loginApi = new LoginApi();
