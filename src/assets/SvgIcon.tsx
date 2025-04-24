import React, {useState} from 'react';
import {PressableProps} from 'react-native';
import {useTheme} from '@shopify/restyle';
import {Color, Theme} from '@/style';
import {Pressable} from '@/component';

import Close from './svg/close.svg';
import EyeHide from './svg/eyeHide.svg';
import EyeShow from './svg/eyeShow.svg';
import CheckCircle from './svg/checkCircle.svg';
import circle from './svg/cricle.svg';
import downArrow from './svg/downArrow.svg';
import calender from './svg/calender.svg';
import editIcon from './svg/edit.svg';
import login from './svg/login.svg';
import threeDot from './svg/threeDot.svg';
import Drawer from './svg/Drawer.svg';
import resetPassword from './svg/resetPassword.svg';
import noData from './svg/nodata.svg';
import closeWhite from './svg/closeWhite.svg';
import Plus from './svg/Plus.svg';
import ZigzagCurve from './svg/ZigzagCurve.svg';
import share from './svg/share.svg';
import updateApp from './svg/updateApp.svg';
import UnderDevelopment from './svg/UnderDevelopment.svg';

const DEFAULT_SIZE = 25;

export const svgs = {
  close: Close,
  eyeHide: EyeHide,
  eyeShow: EyeShow,
  checkCircle: CheckCircle,
  circle: circle,
  edit: editIcon,
  downArrow: downArrow,
  calender: calender,
  login: login,
  threeDot: threeDot,
  drawer: Drawer,
  resetPassword: resetPassword,
  noData:noData,
  closeWhite:closeWhite,
  plus: Plus,
  zigzagCurve: ZigzagCurve,
  share: share,
  updateApp:updateApp,
  UnderDevelopment:UnderDevelopment,
};

export type Svg = keyof typeof svgs;

export interface SvgIconProps {
  height?: number | string;
  width?: number | string;
  name: Svg;
  fill?: Color | string;
  stroke?: Color | string;
  onPress?: () => void;
  pressableProps?: PressableProps;
  disabled?: boolean;
}

export const SvgIcon: React.FC<SvgIconProps> = ({
  name,
  fill,
  stroke,
  height = DEFAULT_SIZE,
  width = DEFAULT_SIZE,
  onPress,
  disabled,
  pressableProps,
}: SvgIconProps) => {
  const {colors} = useTheme<Theme>();
  // @ts-ignore
  const fillColor = fill ? colors[fill] ?? fill : undefined;
  // @ts-ignore
  const strokeColor = stroke ? colors[stroke] ?? stroke : undefined;
  const Svg = svgs[name];
  const [isPressed, setIsPressed] = useState<boolean>();

  return (
    <Pressable
      disabled={disabled || !onPress}
      hitSlop={onPress ? {top: 30, bottom: 30, left: 30, right: 30} : undefined}
      justifyContent="center"
      alignItems="center"
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={{opacity: isPressed ? 0.5 : 1}}
      {...pressableProps}>
      <Svg
        width={width}
        height={height}
        fill={fillColor}
        stroke={strokeColor}
      />
    </Pressable>
  );
};
