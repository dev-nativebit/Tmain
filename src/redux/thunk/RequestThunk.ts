import {dispatchable} from '@/redux/dispatchable';
import { saveTagValueApi, SaveTagValueApiParams, getRequestListApi, GetRequestListApiParams } from "@/api";
import {Dispatch} from 'react';
import {Action} from 'redux-saga';
import {getDefaultError, Result} from '@/core';
import {RequestList} from '@/model';
import {RequestDto} from '@/dtos';
import {ToastAndroid} from 'react-native';
import {requestActions} from '@/redux/slice/RequestSlice';


export const getRequestListApiThunkCall = dispatchable((params: GetRequestListApiParams) => {
    return async (dispatch: Dispatch<Action>) => {
      try {
        dispatch(requestActions.requestList(Result.waiting()));
        const response = await getRequestListApi.post(params);

        if (response.isSuccess) {
          //Parse dto from api response top model
          const dataModel = new RequestList(response.data.data as RequestDto[]);
          // await LoginAgainThunkCall();
          //Wrap with result class
          const resultDataModel = Result.ok(dataModel);
          //Dispatch to store in to redux
          dispatch(requestActions.requestList(resultDataModel));
          //Return the result, so it can be used where api triggered
          return response;
        } else {
          ToastAndroid.show(response?.error ?? '', ToastAndroid.LONG);
        }
        //Dispatch to fail the response
        dispatch(requestActions.requestList(Result.fail('getRequestListApiThunkCall')));
        return getDefaultError(response.error, 'getRequestListApiThunkCall');
      } catch (e) {
        //Dispatch to fail the response
        return getDefaultError(e, 'CATCH getRequestListApiThunkCall');
      }
    };
  },
);

export const saveTagValueApiThunkCall = dispatchable((params: SaveTagValueApiParams) => {
    return async (dispatch: Dispatch<Action>) => {
      try {
        dispatch(requestActions.approveRequest(Result.waiting()));
        const response = await saveTagValueApi.post(params);

        if (response.isSuccess) {
          //Parse dto from api response top model
          const dataModel = response.data
          // await LoginAgainThunkCall();
          //Wrap with result class
          const resultDataModel = Result.ok(dataModel);
          //Dispatch to store in to redux
          dispatch(requestActions.approveRequest(resultDataModel));
          ToastAndroid.show(response?.message ?? '', ToastAndroid.LONG);
          //Return the result, so it can be used where api triggered
          return response;
        } else {
          ToastAndroid.show(response?.error ?? '', ToastAndroid.LONG);
        }
        //Dispatch to fail the response
        dispatch(requestActions.approveRequest(Result.fail('approveRequestApiThunkCall')));
        return getDefaultError(response.error, 'approveRequestApiThunkCall');
      } catch (e) {
        //Dispatch to fail the response
        return getDefaultError(e, 'CATCH approveRequestApiThunkCall');
      }
    };
  },
);

export const updateItemListThunkCall = dispatchable((itemList:RequestList,value:string,id:number) => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      dispatch(requestActions.requestList(Result.waiting()));
      const indexInItem = itemList.findIndex(
        item => item.id === id,
      );

      if (indexInItem > -1){

        const inItemDTOS = itemList.items.map(
          inItem => {
            return inItem.getDto();
          },
        );
        inItemDTOS[indexInItem].value = value
        //Parse dto from api response top model
        const dataModel = new RequestList(inItemDTOS);
        //Wrap with result class
        const resultDataModel = Result.ok(dataModel);
        //Dispatch to store in to redux
        dispatch(requestActions.requestList(resultDataModel));
        //Return the result, so it can be used where api triggered
      }
    } catch (e) {
      //Dispatch to fail the response
      return getDefaultError(e, 'CATCH updateItemListThunkCall');
    }
  };
});
