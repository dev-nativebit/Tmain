import {HttpGet} from '@/Interfaces';
import {http, Result} from '@/core';
import {LOGOUT} from '@/api/EndPoint';

class LogoutApi implements HttpGet<string> {
  get = async (): Promise<Result<string>> => http.get(LOGOUT());
}

export const logoutApi = new LogoutApi();
