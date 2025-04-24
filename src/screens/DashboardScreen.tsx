import React, {useEffect, useMemo, useState} from 'react';
import {
  Box,
  DashboardCard,
  hideFullScreenProgress, Pressable,
  Screen, showFullScreenProgress,
  StatusBarType, Text,
} from '@/component';
import { SaveTagValueApiParams, GetRequestListApiParams } from "@/api";
import {actions, RootState, useAppSelector} from '@/redux/root.store';
import {RequestList, RequestModel, TagsModel} from '@/model';
import {DeviceHelper} from '@/helper';
import {SvgIcon} from '@/assets/SvgIcon';
import {FlatList, RefreshControl, ScrollView} from 'react-native';
import {RequestDto, TagsDto} from '@/dtos';
import {fonts} from '@/style';

export const DashboardScreen: React.FC = () => {
  const requestListResult = useAppSelector((state: RootState) => state.requestDetail.requestList);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');

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

  const tagsData = useMemo(() => {
    if (requestListResult?.isSuccess) {
      const data =  requestListResult.getValue();
      setSelectedFilter(data?.groupList[0] ? data?.groupList[0] :'')
      return data;
    }
    return new TagsModel({} as TagsDto);
  }, [requestListResult]);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    callApi();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const saveTagValueApiCall = (item:RequestModel) =>{
    actions.updateItemListThunkCallActions(
      tagsData,
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

  const requestList = useMemo(() => {
    if (requestListResult?.isSuccess) {
      const data = requestListResult.getValue().data
      if (selectedFilter){
        const tempSearchData:any[] =[]
        data.items.map(item => {
          if (selectedFilter === item.group_name){
            tempSearchData.push(item.getDto())
          }
        })
        return new RequestList(tempSearchData as RequestDto[])
      }else {
        return data;
      }
    }
    return new RequestList();
  }, [requestListResult,selectedFilter]);


  return (
    <Screen backgroundColor={'white'} statusBarType={StatusBarType.Dark}>
      <Box
        marginTop={'r'}
        flexDirection={'row'}
        alignItems={'center'}
        justifyContent={'center'}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {tagsData?.groupList?.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSelectedFilter(item);
              }}
              borderWidth={1.2}
              borderColor={selectedFilter === item ? 'primary' : 'grey'}
              backgroundColor={selectedFilter === item ? 'primary' : 'white'}
              paddingVertical={'s'}
              marginStart={'s'}
              marginEnd={index + 1 < tagsData?.groupList?.length ? 'none' : 's'}
              borderRadius={8}
              alignItems={'center'}>
              <Text
                fontSize={15}
                fontFamily={fonts.medium}
                color={selectedFilter === item ? 'white' :'primaryColor1'}
                paddingHorizontal={'ssr'}>
                {item}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </Box>
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
