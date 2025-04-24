import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  DashboardCard,
  Header, hideFullScreenProgress,
  Screen, showFullScreenProgress,
  StatusBarType,
  TabButtons
} from "@/component";
import { SaveTagValueApiParams, GetRequestListApiParams } from "@/api";
import {actions, RootState, useAppSelector} from '@/redux/root.store';
import { RequestList, RequestModel } from "@/model";
import {Storage} from '@/core';
import {DeviceHelper} from '@/helper';
import {SvgIcon} from '@/assets/SvgIcon';
import {FlatList, RefreshControl} from 'react-native';
import { goBack, navigate, reset, Routes } from "@/navigation/AppNavigation";
import { RejectNotesIDs } from "@/customFormGenerator";

export const DashboardScreen: React.FC = () => {
  const requestListResult = useAppSelector(
    (state: RootState) => state.requestDetail.requestList,
  );
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    callApi();
  }, []);

  const callApi = () => {
    const params: GetRequestListApiParams = {
      length: '1000',
      search: '',
      start: '0',
    };
    actions.getRequestListApiThunkCallActions(params).then();
  };

  const requestList = useMemo(() => {
    if (requestListResult?.isSuccess) {
      return requestListResult.getValue();
    }
    return new RequestList();
  }, [requestListResult]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    callApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handelOnLogoutPress = async () => {
    // actions.logoutThunkCallActions().then(async () => {
    await Storage.logout();
    reset({
      screenName: Routes.Login,
    });
    // });
  };

  const saveTagValueApiCall = (item:RequestModel) =>{
    actions.updateItemListThunkCallActions(
      requestList,
      parseInt(item.value) > 0 ? '0' : '1',
      item.monitorId
    ).then()

    const params:SaveTagValueApiParams ={
      monitorId: item.monitorId.toString(),
      tagValue:parseInt(item.value) > 0 ? '0' : '1',
    }
    showFullScreenProgress()
    actions.saveTagValueApiThunkCallActions(params).then(value => {
      hideFullScreenProgress()
      if (value.isSuccess){
        // callApi()
      }
    })
  }



  return (
    <Screen backgroundColor={'white'} statusBarType={StatusBarType.Dark}>
      <Header
        onDrawerPress={() => {}}
        title={'Dashboard'}
        isShowAttention={true}
        onUserPress={handelOnLogoutPress}
      />

      <Box flex={1}>
        <FlatList
          data={requestList.items}
          onMomentumScrollBegin={() => {
            // setOnEndReachedCalledDuringMomentum(false);
          }}
          keyExtractor={item => item.monitorId.toString()}
          showsVerticalScrollIndicator={false}
          numColumns={3}
          renderItem={({item, index}) => {
            return (
              <DashboardCard
                onPress={() => {
                  saveTagValueApiCall(item)
                }}
                item={item}
              />
            );
          }}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <Box height={DeviceHelper.height() / 1.2} alignItems={'center'}>
              <SvgIcon
                name={'noData'}
                height={DeviceHelper.calculateWidthRatio(200)}
                width={DeviceHelper.calculateWidthRatio(200)}
                pressableProps={{
                  style: {
                    alignSelf: 'center',
                    height: '100%',
                  },
                }}
              />
            </Box>
          }
          ListFooterComponent={<Box height={200} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </Box>
    </Screen>
  );
};
