import React, {useEffect, useState} from 'react';
import {Box} from '@/component/Box';
import {SvgIcon} from '@/assets/SvgIcon';
import {DeviceHelper} from '@/helper';
import {Image, Pressable, Text} from '@/component';
import {fonts, Theme} from '@/style';
import {Images} from '@/assets';
import {useTheme} from '@shopify/restyle';
import {Storage} from '@/core';
import {actions, RootState, useAppSelector} from '@/redux/root.store';

export interface HeaderProps {
  onDrawerPress: () => void;
  title: string;
  onUserPress?: () => void;
  isShowAttention?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onDrawerPress,
  onUserPress,
  title,
  isShowAttention = false,
}: HeaderProps) => {
  const {colors} = useTheme<Theme>();
  const [isLogin, setIsLogin] = useState(false);
  const requestListResult = useAppSelector((state: RootState) => state.loginDetail.LoginResult,);
  useEffect(() => {
    loginAgain().then()
  }, [requestListResult]);
  const loginAgain = async () => {
    try {
      const response = await Storage.getItemAsync(Storage.keys.login);
      if (response !== null) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } catch (e) {
      console.log(e);
    }
  };


  return (
    isLogin ? (
      <Box
        flexDirection={'row'}
        height={DeviceHelper.calculateHeightRatio(60)}
        paddingHorizontal={'r'}
        borderBottomWidth={1}
        justifyContent={'space-between'}
        borderBottomColor={'grey'}
        alignItems={'center'}
        backgroundColor={'primaryColor'}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <SvgIcon
            name={'drawer'}
            height={DeviceHelper.calculateWidthRatio(33)}
            width={DeviceHelper.calculateWidthRatio(33)}
            onPress={onDrawerPress}
            pressableProps={{
              style: {
                zIndex: 1,
              },
            }}
            fill={'white'}
          />
          <Text
            color={'white'}
            fontSize={16}
            fontWeight={'800'}
            lineHeight={26}
            paddingStart={'s'}
            fontFamily={fonts.semiBold}
          >
            {title}
          </Text>
        </Box>
        <Box flexDirection={'row'} height={DeviceHelper.calculateHeightRatio(60)}>
          {isShowAttention && (
            <Pressable
              onPress={onUserPress}
              height={'100%'}
              alignItems={'center'}
              justifyContent={'center'}
              width={DeviceHelper.calculateWidthRatio(40)}>
              <Image
                source={Images.logout}
                height={DeviceHelper.calculateWidthRatio(25)}
                width={DeviceHelper.calculateWidthRatio(25)}
                tintColor={colors.white}
              />
            </Pressable>
          )}
        </Box>
      </Box>
      ):
        null

  );
};
