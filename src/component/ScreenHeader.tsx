import React from 'react';
import {Box} from '@/component/Box';
import {DeviceHelper} from '@/helper';
import {Text} from '@/component/Text';
import {fonts, Theme} from '@/style';
import {Pressable} from '@/component/Pressable';
import {Image} from '@/component/Image';
import {Images} from '@/assets';
import {goBack} from '@/navigation/AppNavigation';
import {useTheme} from '@shopify/restyle';

export interface ScreenHeaderProps {
  onBackPress?: () => void;
  title: string;
  onTextPress?: () => void;
  subTitle?: string;
  isAddButton?: boolean;
  onAddPress?: () => void;
  onFilterPress?: () => void;
  fontSize?: number;
  buttonTitle?: string;
  isFilter?: boolean;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
  onBackPress,
  title,
  onTextPress,
  subTitle,
  fontSize = 18,
  isAddButton,
  onAddPress,
  buttonTitle,
  isFilter =false,
  onFilterPress

}: ScreenHeaderProps) => {
  const {colors} = useTheme<Theme>();
  const handelOnBackPress = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      goBack();
    }
  };

  const handleOnTextPress = () => {
    if (onTextPress) {
      onTextPress();
    }
  };


  return (
    <Box>
      <Box
        flexDirection={'row'}
        height={DeviceHelper.calculateHeightRatio(60)}
        borderBottomWidth={1}
        justifyContent={'space-between'}
        borderBottomColor={'grey'}
        alignItems={'center'}
        backgroundColor={'primaryColor'}>
        <Box flexDirection={'row'} alignItems={'center'}>
          <Pressable
            onPress={handelOnBackPress}
            height={DeviceHelper.calculateHeightRatio(60)}
            justifyContent={'center'}
            alignItems={'center'}
            width={DeviceHelper.calculateWidthRatio(50)}>
            <Image
              source={Images.leftArrow}
              height={DeviceHelper.calculateWidthRatio(20)}
              width={DeviceHelper.calculateWidthRatio(25)}
              tintColor={colors.white}
              resizeMode={'contain'}
            />
          </Pressable>

          <Pressable
            onPress={handleOnTextPress}
            paddingVertical={'e6'}
            width={'80%'}>
            <Text
              color={'white'}
              fontSize={fontSize}
              fontFamily={fonts.semiBold}
              numberOfLines={2}
              paddingStart={'s'}>
              {title}
            </Text>
            {subTitle && (
              <Text
                color={'white'}
                fontSize={12}
                fontFamily={fonts.semiBold}
                fontWeight={'800'}
                paddingStart={'s'}>
                {subTitle}
              </Text>
            )}
          </Pressable>
        </Box>
        <Box flexDirection={'row'} alignItems={'center'} height={DeviceHelper.calculateHeightRatio(60)}>
          {
            isAddButton && (
              <Pressable
                onPress={onAddPress}
                height={'100%'}
                marginEnd={'s'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'absolute'}
                right={5}
              >
                <Text
                  fontSize={16}
                  fontFamily={fonts.semiBold}
                  color={'white'}
                >
                  {buttonTitle}
                </Text>
              </Pressable>
            )
          }
          {
            isFilter && (
              <Pressable
                onPress={onFilterPress}
                height={'100%'}
                marginEnd={'s'}
                alignItems={'center'}
                justifyContent={'center'}
                position={'absolute'}
                right={5}
              >
               <Image source={Images.filter} tintColor={'white'} height={20} width={20} />
              </Pressable>
            )
          }
        </Box>
      </Box>
    </Box>
  );
};
