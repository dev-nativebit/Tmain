import {LayoutChangeEvent} from 'react-native';
import React, {FC, useState} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useTheme} from '@shopify/restyle';
import {fonts, Theme} from '@/style';
import {Box, Pressable, Text} from '@/component';
import {DeviceHelper} from '@/helper/DeviceHelper';

export interface TabButton {
  title: string;
}

interface TabButtonsProps {
  buttons: TabButton[];
  selectedTab: string;
  setSelectedTab: (option: string) => void;
}

/**
 * An animated tab bar of buttons - when user selects a button, tab slides and style changes
 */
export const TabButtons: FC<TabButtonsProps> = ({
  buttons,
  selectedTab,
  setSelectedTab,
}) => {
  const {colors} = useTheme<Theme>();
  const [dimensions, setDimensions] = useState({height: 20, width: 70});

  const buttonWidth = dimensions.width / buttons.length;

  const padding = 5;

  // this will keep track of the translationX value of our moving tab
  const tabPositionX = useSharedValue(0);

  // on view layout, we measure the width and height and
  // set in state so we know how far to move the tab
  const onTabbarLayout = (e: LayoutChangeEvent) => {
    setDimensions({
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    });
  };

  // We can set a callback for any functionality that should fire once the animation is finished
  const handlePressCb = (option: string) => {
    setTimeout(() => {
      setSelectedTab(option);
    }, 100);
  };

  const onTabPress = (index: number) => {
    // animate the tab and fire callback
    tabPositionX.value = withTiming(
      buttonWidth * index,
      {
        duration: 500,
      },
      () => {},
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    // apply animated value to the style, moving the tab
    return {
      transform: [{translateX: tabPositionX.value}],
    };
  });

  return (
    <Box
      backgroundColor={'aero'}
      justifyContent={'center'}
      borderRadius={8}
      marginHorizontal={'sr'}
      height={DeviceHelper.calculateWidthRatio(DeviceHelper.isIos() ? 40 : 40)}>
      <Animated.View
        style={[
          animatedStyle,
          {
            height: DeviceHelper.calculateWidthRatio(
              DeviceHelper.isIos() ? 32 : 40,
            ),
            width: buttonWidth,
            backgroundColor: colors.primary,
            position: 'absolute',
            borderRadius: 8,
          },
        ]}
      />
      <Box onLayout={onTabbarLayout} flexDirection={'row'}>
        {buttons.map((button, index) => {
          const color = selectedTab === button.title ? 'white' : 'primary';
          return (
            <Pressable
              key={index.toString()}
              onPress={() => {
                handlePressCb(button.title);
                onTabPress(index);
              }}
              flex={1}
              alignItems={'center'}
              justifyContent={'center'}
              borderRadius={5}
              paddingVertical={'s'}>
              <Text
                fontSize={13}
                fontWeight={'600'}
                color={color}
                letterSpacing={0.12}
                lineHeight={16.8}
                fontFamily={fonts.semiBold}>
                {button.title}
              </Text>
            </Pressable>
          );
        })}
      </Box>
    </Box>
  );
};
