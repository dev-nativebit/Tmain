import React, {useEffect, useRef, useState} from 'react';
import {Box} from '@/component/Box';
import {Image} from '@/component/Image';
import {Images} from '@/assets';
import {Keyboard, Pressable, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  WithSpringConfig,
  withTiming,
} from 'react-native-reanimated';
import {Text} from '@/component/Text';
import {fonts} from '@/style';
import {DeviceHelper} from '@/helper';
import { LabelValuePair } from "@/component/Types";

const DURaTIONS = 400;
const TRANSLATE = -80;
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export interface FloatButtonProps {
  onPress: (id:string) => void;
  bottom?: number;
  menuArray:LabelValuePair[]
}


export const FloatButton: React.FC<FloatButtonProps> = ({
  onPress,
  bottom = 120,
  menuArray
}: FloatButtonProps) => {
  const isOpen = useRef(false);
  const transYCamera = useSharedValue(0);
  const transYCamerae = useSharedValue(0);
  const opacity = useSharedValue(1);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleOnPress = () => {
    if (isOpen.current) {
      transYCamera.value = withDelay(
        DURaTIONS,
        withTiming(0, {
          duration: DURaTIONS,
          easing: Easing.bezierFn(0.36, 0, 0.66, -0.56),
        }),
      );
      transYCamerae.value = withDelay(
        DURaTIONS / 2,
        withTiming(0, {
          duration: DURaTIONS,
          easing: Easing.bezierFn(0.36, 0, 0.66, -0.56),
        }),
      );
      opacity.value = withTiming(1, {duration: DURaTIONS});
    } else {
      const config: WithSpringConfig = {damping: 12};
      transYCamera.value = withSpring(TRANSLATE, config);
      transYCamerae.value = withDelay(
        DURaTIONS / 2,
        withSpring(TRANSLATE, config),
      );
      opacity.value = withTiming(0, {duration: DURaTIONS});
    }
    isOpen.current = !isOpen.current;
  };

  const rRegularAnimateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            transYCamerae.value,
            [TRANSLATE, 0],
            [TRANSLATE / 2, 0],
          ),
        },
        {translateX: interpolate(transYCamerae.value, [TRANSLATE, 0], [1, 0])},
        {scale: interpolate(transYCamerae.value, [TRANSLATE, 0], [1, 0])},
      ],
    };
  });
  const rPlusAnimateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ:
            interpolate(opacity.value, [0, 1], [90, 0]).toString() + 'deg',
        },
      ],
      opacity: opacity.value,
    };
  });
  const rMinusAnimateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateZ:
            interpolate(opacity.value, [0, 1], [0, -90]).toString() + 'deg',
        },
      ],
    };
  });

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
    <Box
      position={'absolute'}
      bottom={DeviceHelper.calculateHeightRatio(bottom)}
      zIndex={1}
      right={DeviceHelper.calculateWidthRatio(15)}>
      <Pressable
        onPress={handleOnPress}
        style={({pressed}) =>
          pressed
            ? [styles.plusButton, {transform: [{scale: 0.9}]}]
            : styles.plusButton
        }>
        <Animated.View style={rPlusAnimateStyle}>
          <Image source={Images.minus} height={30} width={30} />
        </Animated.View>
        <Animated.View style={[{position: 'absolute'}, rMinusAnimateStyle]}>
          <Image source={Images.minus} height={30} width={30} />
        </Animated.View>
      </Pressable>
      {
        menuArray.map((value, index) => {
          return(
            <AnimatedPressable
              key={index}
              onPress={() => {
                onPress(value.value as string)
                handleOnPress();
              }}
              style={[
                {
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  position: 'absolute',
                  right: DeviceHelper.calculateWidthRatio(40),
                  bottom: 40 + index * 45,
                },
                rRegularAnimateStyle,
              ]}>
              <Box
                style={{
                  backgroundColor: '#009EE0',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginEnd: 10,
                  width: 120,
                  height: 25,
                }}>
                <Text
                  textAlign={'center'}
                  color={'white'}
                  fontSize={14}
                  fontFamily={fonts.bold}>
                  {value.label}
                </Text>
              </Box>
              <Box
                height={35}
                width={35}
                borderRadius={30}
                backgroundColor={'primary'}
                alignItems={'center'}
                justifyContent={'center'}>
                <Image
                  source={Images.helmet}
                  height={21}
                  width={21}
                  tintColor={'white'}
                />
              </Box>
            </AnimatedPressable>
          )
        })
      }
    </Box>
  );
};

const styles = StyleSheet.create({
  plusButton: {
    width: DeviceHelper.calculateWidthRatio(60),
    height: DeviceHelper.calculateWidthRatio(60),
    backgroundColor: '#009EE0',
    borderRadius: DeviceHelper.calculateWidthRatio(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#009EE0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 5,
    flexDirection: 'row',
  },
  insideBox: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    borderRadius: 5,
    flexDirection: 'row',
  },
});
