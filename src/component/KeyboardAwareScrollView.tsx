import React, {useEffect, useState} from 'react';
import {ScrollViewProps, useWindowDimensions} from 'react-native';
import {
  KeyboardAwareProps,
  KeyboardAwareScrollView,
} from 'react-native-keyboard-aware-scroll-view';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {DeviceHelper} from '@/helper/DeviceHelper';

export interface KeyboardAwareScrollViewProps {
  children: React.ReactNode;
  contentContainerStyle?: StyleProp<ViewStyle> | undefined;
  style?: StyleProp<ViewStyle> | undefined;
}
export const CustomKeyboardAwareScrollView: React.FC<
  KeyboardAwareScrollViewProps
> = ({
  children,
  contentContainerStyle,
  style,
}: KeyboardAwareScrollViewProps) => {
  const [contentBottom, setContentBottom] = useState(0);
  const [keyboardActive, setKeyboardActive] = useState(false);

  const {height} = useWindowDimensions();
  const keyHeight = DeviceHelper.height();
  useEffect(() => {
    if (keyboardActive) {
      const diff = parseFloat(String((height - keyHeight) / 2));
      setContentBottom(diff);
    } else {
      setContentBottom(0);
    }
  }, [height, keyHeight, keyboardActive]);

  interface KType extends KeyboardAwareProps, ScrollViewProps {}
  const getKeyboardAwareProps = (): KType => {
    const kProps: KType = {
      keyboardOpeningTime: 0,
      enableResetScrollToCoords: true,
      onKeyboardWillHide: () => setKeyboardActive(false),
      onKeyboardWillShow: () => setKeyboardActive(true),
      automaticallyAdjustKeyboardInsets: DeviceHelper.isAndroid(),
      automaticallyAdjustContentInsets: DeviceHelper.isIos(),
      showsVerticalScrollIndicator: false,
      contentContainerStyle,
      style,
      keyboardShouldPersistTaps: 'handled',
    };
    if (DeviceHelper.isAndroid()) {
      /**
       * This is to handle content bottom in android
       * need to separate it from ios as it is creating issue
       */
      kProps.contentInset = {bottom: contentBottom};
    }
    return kProps;
  };
  return (
    <KeyboardAwareScrollView {...getKeyboardAwareProps()}>
      {children}
    </KeyboardAwareScrollView>
  );
};
