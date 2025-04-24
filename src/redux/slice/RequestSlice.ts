import {Result} from '@/core';
import { RequestList } from "@/model";
import {createSlice} from '@reduxjs/toolkit';
import { REQUEST } from "@/redux/slice/Types";
import RequestReducer from "@/redux/reducer/RequestReducer";

export interface RequestSliceType {
  requestList?: Result<RequestList>;
  approveRequest?: Result<string>;
  // forceUpdate?:Result<ForceUpdateModel>
}

export const initialState: RequestSliceType = {
  requestList: undefined,
  approveRequest: undefined,
  // forceUpdate:undefined,d,
};

const RequestSlice = createSlice({
  name: REQUEST,
  initialState: initialState,
  reducers: RequestReducer,
});

export const {actions: requestActions, reducer: requestReducer} = RequestSlice;
