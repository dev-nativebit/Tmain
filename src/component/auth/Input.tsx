import React, {useState} from 'react';
import {TextInput, TextInputProps} from 'react-native';
import {ResponsiveValue, useTheme} from '@shopify/restyle';
import {DeviceHelper} from '@/helper/DeviceHelper';
import {fonts, Theme} from '@/style';
import {Images} from '@/assets';
import {
  Box,
  FieldError,
  FieldErrorProps,
  Image,
  Pressable,
  Text,
} from '@/component';

export interface InputHintProps {
  hint?: string;
}

export interface InputImageProps {
  // @ts-ignore
  iconName?: Images;
}

export interface InputProps
  extends InputHintProps,
    InputImageProps,
    TextInputProps {
  onPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  isBottomMargin?: boolean;
  hasError?: boolean;
  isCountry?: boolean;
  countryName?: string;
  isPatternInput?: boolean;
  maxLength?: number;
  isHeight?: boolean;
  height?: number;
  isIcon?: boolean;
  onApply?: () => void;
  disable?: boolean;
  ref?: React.ForwardedRef<any>;
  isBottomBorder?: boolean;
}

export const Input: React.FC<InputProps> = (props: InputProps) => {
  const {
    onPress,
    leftComponent,
    isBottomMargin = true,
    hasError,
    maxLength,
    height,
    disable = false,
    rightComponent,
    ref,
    isBottomBorder = false,
  } = props;
  const [isFocused, setIsFocused] = useState(false);
  const textInputProps = props as TextInputProps;
  const fieldErrorProps = props as FieldErrorProps;
  const {multiline, value, placeholder, keyboardType, autoCapitalize} =
    textInputProps;
  const {colors} = useTheme<Theme>();
  const {white} = colors;
  const {gray} = colors;

  const borderColor = (): ResponsiveValue<
    keyof Theme['colors'],
    Theme['breakpoints']
  > => {
    if (hasError) {
      return 'red';
    }
    if (isFocused || value) {
      return 'primaryColor';
    }
    return 'darkGray2';
  };

  return (
    <Box zIndex={0}>
      <Pressable
        disabled={!onPress}
        width="100%"
        borderWidth={isBottomBorder ? 0 : 1}
        borderRadius={5}
        borderColor={borderColor()}
        flexDirection="row"
        alignItems="center"
        backgroundColor={disable ? 'bleuDeFrance' : 'white'}
        onPress={DeviceHelper.ios() ? undefined : onPress}
        overflow="hidden"
        paddingVertical={multiline ? 'ss' : 'none'}
        height={DeviceHelper.calculateHeightRatio(height ?? 40)}>
        {leftComponent}
        <TextInput
          ref={ref}
          onTouchEnd={onPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          maxLength={maxLength}
          style={{
            fontFamily: fonts.regular,
            fontSize: 14,
            flex: 1,
            height: '100%',
            marginTop: multiline ? 10 : 0,
            paddingTop: multiline ? 10 : 0,
            paddingStart: leftComponent ? 0 : 8,
            color: colors.black,
            paddingVertical: multiline ? 10 : 0,
            textAlignVertical: multiline ? 'top' : 'center',
          }}
          {...textInputProps}
          keyboardType={keyboardType}
          value={value}
          autoCapitalize={autoCapitalize}
        />
        {rightComponent && rightComponent}
      </Pressable>
      <Box alignSelf="flex-start">
        <FieldError {...fieldErrorProps} />
      </Box>
    </Box>
  );
};
