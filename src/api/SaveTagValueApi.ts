import {HttpPost} from '@/Interfaces';
import {http, Result} from '@/core';
import {REQUEST_APPROVE} from '@/api/EndPoint';

export interface SaveTagValueApiParams {
  monitorId: string;
  tagValue: string;
}

class SaveTagValueApi implements HttpPost<string>{
  post = async (params: SaveTagValueApiParams): Promise<Result<string>> => {
    const formData = new FormData();
    const paramKeys = Object.keys(params);
    paramKeys.map(paramKey => {
      formData.append(
        paramKey,
        params[`${paramKey}` as keyof SaveTagValueApiParams],
      );
    });
    return http.post(REQUEST_APPROVE(), formData);
  };
}

export const saveTagValueApi = new SaveTagValueApi()
