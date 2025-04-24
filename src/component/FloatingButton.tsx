import React, {useEffect, useState} from 'react';
import {Pressable} from '@/component/Pressable';
import {DeviceHelper} from '@/helper';
import {Image} from '@/component/Image';
import {Images} from '@/assets';
import {Keyboard} from 'react-native';

export interface FloatingButtonProps {
  onPress: () => void;
  bottom?: number;
}

export const FloatingButton: React.FC<FloatingButtonProps> = ({
  onPress,
  bottom = 120,
}: FloatingButtonProps) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return isKeyboardVisible ? (
    <></>
  ) : (
    <Pressable
      onPress={onPress}
      position={'absolute'}
      backgroundColor={'primary'}
      height={DeviceHelper.calculateWidthRatio(60)}
      width={DeviceHelper.calculateWidthRatio(60)}
      bottom={DeviceHelper.calculateHeightRatio(bottom)}
      borderRadius={DeviceHelper.calculateWidthRatio(35)}
      right={DeviceHelper.calculateWidthRatio(15)}
      alignItems={'center'}
      justifyContent={'center'}>
      <Image
        source={Images.add}
        tintColor={'#fff'}
        height={DeviceHelper.calculateWidthRatio(28)}
        width={DeviceHelper.calculateWidthRatio(28)}
      />
    </Pressable>
  );
};
