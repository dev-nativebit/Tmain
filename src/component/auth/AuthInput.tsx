import React, {useState} from 'react';
import {Box} from '../Box';
import {Text} from '../Text';

import {ResponsiveValue} from '@shopify/restyle';
import {
  FieldErrorProps,
  Input,
  InputProps,
  Pressable,
  Image,
} from '@/component';
import {CustomFormFieldType} from '@/dtos';
import {fonts, Theme} from '@/style';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {StyleSheet} from 'react-native';

export interface AuthInputProps extends InputProps, FieldErrorProps {
  label: string;
  isRequired?: boolean;
  fieldType?: CustomFormFieldType;
  isShowLabel?: boolean;
  labelColor?: ResponsiveValue<keyof Theme['colors'], Theme['breakpoints']>;
  labelFontFamily?: ResponsiveValue<
    string | undefined,
    {phone: number; tablet: number}
  >;
  onVerify?: () => void;
  isShowVerify?: boolean;
  value?: string;
}

export const AuthInput: React.FC<AuthInputProps> = (props: AuthInputProps) => {
  const inputProps = props as InputProps;
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const {
    label,
    isRequired = false,
    isShowLabel = false,
    fieldType,
    labelFontFamily = fonts.regular,
    labelColor = 'slateGray',
    onVerify,
    isShowVerify = false,
    value,
    isBottomMargin
  } = props as AuthInputProps;

  return (
    <Box marginBottom={isBottomMargin ? 'srr' : 'none'}>
      {isShowLabel && (
        <Box flexDirection={'row'} justifyContent={'space-between'}>
          <Text
            fontSize={14}
            fontFamily={labelFontFamily}
            lineHeight={16}
            color={labelColor}
            letterSpacing={0.15}
            style={[
              styles.label,
              // @ts-ignore
              (isFocused || value) && styles.labelFocused,
              isFocused && styles.labelActive,
            ]}
            fontWeight={'500'}>
            {label}
            {isRequired && <Text color={'red'}>{'*'}</Text>}
          </Text>
        </Box>
      )}
      <Input
        {...inputProps}
        secureTextEntry={
          fieldType === CustomFormFieldType.password && isShowPassword
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rightComponent={
          fieldType === CustomFormFieldType.password ? (
            <Pressable
              onPress={() => {
                setIsShowPassword(!isShowPassword);
              }}
              justifyContent="center"
              alignItems="center"
              height={40}
              backgroundColor={'white'}
              width={40}
              marginEnd="ss">
              <Image
                source={isShowPassword ? Images.eyeHide : Images.eyeShow}
                resizeMode={'contain'}
                width={DeviceHelper.calculateHeightRatio(25)}
                height={DeviceHelper.calculateWidthRatio(25)}
              />
            </Pressable>
          ) : (
            inputProps.rightComponent
          )
        }
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    left: 15,
    top: 14,
    paddingHorizontal: 2,
    backgroundColor: 'white',
    zIndex: 1,
    transform: [{translateY: -3}],
  },
  labelFocused: {
    transform: [{translateY: -21}],
    color: '#000',
  },
  labelActive: {
    color: '#f17616',
  },
  inputFocused: {
    borderColor: '#f17616',
  },
});
