import React, {useMemo} from 'react';
import {ColorValue, StatusBar, StatusBarStyle} from 'react-native';
import {ResponsiveValue, useTheme} from '@shopify/restyle';
import {Box} from './Box';
import {Theme} from '@/style';
import {useIsFocused} from '@react-navigation/native';
import {DeviceHelper} from '@/helper/DeviceHelper';

export enum StatusBarType {
  Light,
  Dark = 1,
}

export interface ScreenProps {
  children: React.ReactNode;
  statusBarType?: StatusBarType;
  hideStatusBar?: boolean;
  translucent?: boolean;
  backgroundColor?: ResponsiveValue<
    keyof Theme['colors'],
    Theme['breakpoints']
  >;
  statusBarColor?: ColorValue;
  isDefaultIOSPaddingFromTop?: boolean;
}

/**
 *
 * @param props
 * isDefaultIOSPaddingFromTop : Pass it to false is particular screen use SafeAreaView
 * @constructor
 */
export const Screen: React.FC<ScreenProps> = (props: ScreenProps) => {
  const {
    children,
    statusBarType,
    backgroundColor = 'white',
    hideStatusBar = false,
    translucent = false,
    statusBarColor,
    isDefaultIOSPaddingFromTop = DeviceHelper.isIos(),
  } = props;
  const isFocused = useIsFocused();

  const {colors} = useTheme<Theme>();

  const statusbarDarkColor: ColorValue = useMemo(() => {
    if (statusBarColor) {
      return statusBarColor;
    } else {
      return colors.primaryColor;
    }
  }, [colors.primaryColor, statusBarColor]);
  /**
   * Return the color
   * of statusbar based on the type
   * of statusbar
   */
  const statusBarColors: ColorValue = useMemo(() => {
    switch (statusBarType) {
      case StatusBarType.Light:
        return statusBarColor ? statusBarColor : colors.primaryColor;
      case StatusBarType.Dark:
        return statusbarDarkColor;
      default:
        return colors.white;
    }
  }, [colors.white, statusBarType, statusbarDarkColor]);

  const statusBarStyles: StatusBarStyle = useMemo(() => {
    switch (statusBarType) {
      case StatusBarType.Light:
        return 'dark-content';
      case StatusBarType.Dark:
        return 'light-content';
      default:
        return 'default';
    }
  }, [statusBarType]);

  useMemo(() => {
    if (isFocused) {
      StatusBar.setHidden(hideStatusBar);
      StatusBar.setBarStyle(statusBarStyles);
      if (DeviceHelper.isAndroid()) {
        StatusBar.setBackgroundColor(translucent ? '' : statusBarColors);
        StatusBar.setTranslucent(translucent);
      }
    }
  }, [hideStatusBar, isFocused, statusBarColors, statusBarStyles, translucent]);

  return (
    <Box
      flex={1}
      style={{
        paddingTop: translucent
          ? StatusBar.currentHeight
          : isDefaultIOSPaddingFromTop && DeviceHelper.isIos()
          ? 40
          : 0,
      }}
      backgroundColor={backgroundColor}>
      <StatusBar animated />
      {children}
    </Box>
  );
};
