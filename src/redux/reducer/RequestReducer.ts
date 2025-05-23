import {Result} from '@/core';
import {PayloadAction} from '@reduxjs/toolkit';
import { TagsModel} from '@/model';
import { RequestSliceType } from "@/redux/slice/RequestSlice";

export default {
  'requestList': (
    state: RequestSliceType,
    action: PayloadAction<Result<TagsModel>>,
  ) => {
    state.requestList = action.payload;
  },
  'approveRequest': (
    state: RequestSliceType,
    action: PayloadAction<Result<string>>,
  ) => {
    state.approveRequest = action.payload;
  },
  // 'forceUpdate': (state:LoginSliceType, action:PayloadAction<Result<ForceUpdateModel>>) =>{
  //   state.forceUpdate = action.payload;
  // },
};
