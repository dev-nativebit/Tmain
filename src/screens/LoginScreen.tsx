import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  CustomKeyboardAwareScrollView,
  Forms,
  hideFullScreenProgress, Image,
  Screen,
  showFullScreenProgress,
  StatusBarType,
  Text
} from "@/component";
import {DeviceHelper} from '@/helper';
import { fonts, Theme } from "@/style";
import {customFormGenerator, LoginFormIDs} from '@/customFormGenerator';
import {useForm} from 'react-hook-form';

import {Images} from '@/assets';
import {reset, Routes} from '@/navigation/AppNavigation';
import {LoginApiParams} from '@/api';
import {actions} from '@/redux/root.store';
import { Keyboard } from "react-native";
import { useTheme } from "@shopify/restyle";

export const LoginScreen: React.FC = () => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: {errors},
  } = useForm();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {colors} = useTheme<Theme>()
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

  const form = useMemo(() => customFormGenerator.generateLoginForm(), []);

  const submit = async () => {
    const params: LoginApiParams = {
      user_name: getValues()[LoginFormIDs.userId],
      user_psw: getValues()[LoginFormIDs.password],
    };
    let formData: FormData = new FormData();
    showFullScreenProgress();
    actions.LoginThunkCallActions(formData, params).then(async response => {
      if (response.isSuccess) {
        reset({
          screenName: Routes.Dashboard,
        });
      }
      hideFullScreenProgress();
    });
  };

  const handelOnSignInPress = () => {
    handleSubmit(submit)();
  };


  return (
    <Screen
      backgroundColor={'white'}
      statusBarType={StatusBarType.Light}
      statusBarColor={colors.white}>
      <Box flex={1} backgroundColor={'white'}>
        <CustomKeyboardAwareScrollView>
          <Box  alignItems={'center'}>
            <Image
              source={Images.logo}
              marginTop={'mes'}
              resizeMode={'contain'}
              height={DeviceHelper.calculateWidthRatio(150)}
              width={DeviceHelper.calculateWidthRatio(320)}
            />
            <Box
              alignItems={'center'}
              alignSelf={'center'}
              justifyContent={'center'}
              marginTop={'m'}
              flexDirection={'row'}
            >
              <Box height={2} width={DeviceHelper.calculateWidthRatio(40)} backgroundColor={'primary'} />
              <Text
                fontFamily={fonts.Merienda_bold}
                fontSize={23}
                color={'black'}
                textAlign={'center'}
                paddingHorizontal={'sr'}
                style={{
                  borderWidth:2,
                  borderRadius:20,
                  borderColor:colors.primary
                }}
              >
                {'The Future of Tool Access'}
              </Text>
              <Box height={2} width={DeviceHelper.calculateWidthRatio(40)} backgroundColor={'primary'}/>
            </Box>
          </Box>
          <Text
            paddingStart={'r'}
            marginTop={'el'}
            fontFamily={fonts.medium}
            fontSize={23}
            color={'black'}
          >
            {'Login Details'}
          </Text>
          <Box marginTop={'lm'}>
            <Forms fieldArray={form} control={control} errors={errors} />
            <Box marginHorizontal={'r'} marginTop={'sr'}>
              <Button
                label={'Login'}
                fontFamily={fonts.bold}
                onPress={handelOnSignInPress}
                height={55}
              />
            </Box>
          </Box>
        </CustomKeyboardAwareScrollView>
      </Box>
      {
        !isKeyboardVisible &&(
          <Box position={'absolute'} bottom={-4} flex={1}>
            <Image
              source={Images.bottom_curve}
              width={DeviceHelper.width()}
              resizeMode={'stretch'}
              tintColor={'#f17616'}
            />
          </Box>
        )
      }
    </Screen>
  );
};

