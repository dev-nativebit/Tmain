import React, {useMemo, useState} from 'react';
import {Box} from '../Box';
import {Image, LogoutBottomSheet, SideMenuCell, Text} from '@/component';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {fonts} from '@/style';
import {navigate, reset, Routes} from '@/navigation/AppNavigation';
import {Storage} from '@/core/Storage';
import {RootState, useAppSelector} from '@/redux/root.store';
import { UserModel} from '@/model';
import {ImageSourcePropType} from 'react-native';
import {UserDetailDto} from "@/dtos";


export enum TopTabEnum {
  Home = 'Home',
  Profile = 'Profile',
  Logout = 'Logout',
  TegList = 'Teg List',
}

export interface DeleteDocumentModelProps {
  selectedTab?: TopTabEnum;
  onOptionSelected: (selectedTab: TopTabEnum) => void;
  onClosePress: () => void;
}

export const SideMenu: React.FC<DeleteDocumentModelProps> = ({
    selectedTab,
    onOptionSelected,
    onClosePress,
}: DeleteDocumentModelProps) => {
  const getPartyListResult = useAppSelector((state:RootState) => state.loginDetail.LoginResult);
  const [isVisibleLogout, setIsVisibleLogout] = useState(false);
  const userDetail = useMemo(() => {
    if (getPartyListResult?.isSuccess){
      return getPartyListResult.getValue().userDetail
    }
    return new UserModel({} as UserDetailDto)
  }, []);



  const handelOnLogoutPress = async () =>{
    await Storage.logout()
    reset({
      screenName:Routes.Login
    })
  }

  const getIcon = (type:string):ImageSourcePropType =>{
      switch (type){
        case 'Logout':
          return Images.logout
        default:
          return Images.home
      }
  }

  const handelOnPress = (type:string) =>{
      switch (type){
        case 'Dashboard':
          onClosePress();
          navigate({
            screenName:Routes.Dashboard,
          });
          onOptionSelected(TopTabEnum.Home);
          break;
          case 'Profile':
          onClosePress();
          onOptionSelected(TopTabEnum.Profile);
          break;
          case 'Tag List':
          onClosePress();
          onOptionSelected(TopTabEnum.TegList);
          break;
        case 'Logout':
          onClosePress()
          setIsVisibleLogout(true)
          break;
      }
  }

  const array =[
    {menuName:'Dashboard'},
    {menuName:'Tag List'},
    {menuName:'Profile'},
    {menuName:'Logout'},
  ]
  return (
    <Box flex={1} backgroundColor={'white'}>
      <Box>
        <Box backgroundColor={'primaryColor'} alignItems={'center'}>
          <Image
            source={Images.logo}
            height={DeviceHelper.calculateWidthRatio(120)}
            // @ts-ignore
            width={'80%'}
            resizeMode={'contain'}
          />
        </Box>
        <Text
          fontFamily={fonts.regular}
          fontSize={16}
          color={'black'}
          textAlign={'center'}
          marginHorizontal={'r'}
          marginTop="sr">
          {`${userDetail.user_code}-${userDetail.user_name}`}
        </Text>
        {array.map((item, index) => (
          <SideMenuCell
            key={index}
            onPress={() => {
              handelOnPress(item.menuName);
            }}
            title={item.menuName}
            isSelected={selectedTab === item.menuName}
            icon={getIcon(item.menuName)}
          />
        ))}
      </Box>
      <LogoutBottomSheet
        isVisible={isVisibleLogout}
        onClose={() => {
          setIsVisibleLogout(false);
        }}
        onLogoutPress={handelOnLogoutPress}
        message={'Do you really want to logout?'}
        positiveButtonLabel={'Yes, Logout'}
        negativeButtonLabel={'Cancel'}
      />
    </Box>
  );
};
