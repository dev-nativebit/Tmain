import {Result} from '@/core';
import {PayloadAction} from '@reduxjs/toolkit';
import { LoginModel } from "@/model";
import {LoginSliceType} from '@/redux/slice/LoginSlice';

export default {
  'UserDetail': (
    state: LoginSliceType,
    action: PayloadAction<Result<LoginModel>>,
  ) => {
    state.LoginResult = action.payload;
  },
  // 'forceUpdate': (state:LoginSliceType, action:PayloadAction<Result<ForceUpdateModel>>) =>{
  //   state.forceUpdate = action.payload;
  // },
  'projectId': (state:LoginSliceType, action:PayloadAction<Result<string>>) =>{
    state.projectId = action.payload;
  },
};
