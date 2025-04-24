import React from 'react';
import {Text} from '../Text';
import {fonts, Theme} from '@/style';
import {Image} from '../Image';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {Pressable} from '@/component';
import { ImageSourcePropType } from 'react-native/types';
import {useTheme} from "@shopify/restyle";

export interface SideMenuCellProps {
  title: string;
  onPress: () => void;
  isSelected: boolean;
  icon:ImageSourcePropType
}

export const SideMenuCell: React.FC<SideMenuCellProps> = ({
  title,
  onPress,
  isSelected,
  icon,
}: SideMenuCellProps) => {
    const {colors}= useTheme<Theme>()
  return (
    <Pressable
      height={DeviceHelper.calculateHeightRatio(35)}
      borderRadius={8}
      marginTop={'r'}
      marginHorizontal={'es'}
      backgroundColor={ 'white' }
      onPress={onPress}
      alignItems={'center'}
      flexDirection={'row'}>
      <Image
        source={icon}
        height={DeviceHelper.calculateWidthRatio(25)}
        width={DeviceHelper.calculateWidthRatio(25)}
        marginStart={'r'}
        tintColor={isSelected ? colors.primary:'black'}
      />
      <Text
        marginStart={'sr'}
        fontFamily={fonts.regular}
        fontSize={14}
        lineHeight={22}
        color={isSelected ? 'primary':'eerieBlack'}
        style={{
          flex: 1,
        }}>
        {title}
      </Text>

      <Image
        height={DeviceHelper.calculateHeightRatio(15)}
        width={DeviceHelper.calculateWidthRatio(18)}
        resizeMode={'contain'}
        alignSelf={'center'}
        // @ts-ignore
        tintColor={'gray'}
        marginEnd={'es'}
        source={Images.right}
      />
    </Pressable>
  );
};
