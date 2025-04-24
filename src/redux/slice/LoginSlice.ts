import {Result} from '@/core';
import { LoginModel } from "@/model";
import {createSlice} from '@reduxjs/toolkit';
import {LOGIN_DETAIL} from '@/redux/slice/Types';
import LoginReducer from '@/redux/reducer/loginReducer';

export interface LoginSliceType {
  LoginResult?: Result<LoginModel>;
  // forceUpdate?:Result<ForceUpdateModel>
  projectId?:Result<string>
}

export const initialState: LoginSliceType = {
  LoginResult: undefined,
  // forceUpdate:undefined,
  projectId:undefined,
};

const LoginSlice = createSlice({
  name: LOGIN_DETAIL,
  initialState: initialState,
  reducers: LoginReducer,
});

export const {actions: loginActions, reducer: loginReducer} = LoginSlice;
