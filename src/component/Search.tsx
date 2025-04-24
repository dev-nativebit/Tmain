import React, {useState, useEffect} from 'react';
import {Box} from '@/component/Box';
import {DeviceHelper} from '@/helper/DeviceHelper';
import {Keyboard, TextInput} from 'react-native';
import {Images} from '@/assets';
import {fonts, Theme} from '@/style';
import {useTheme} from '@shopify/restyle';
import {Image} from '@/component/Image';
import {Pressable} from '@/component/Pressable';

export interface SearchProps {
  onPress: (isShow: boolean) => void;
  onClearText: () => void;
  onTextChange: (text: string) => void;
  onEndEditing: () => void;
  onFilterPress?: (key: string) => void;
  search?: string;
  isShowFilter?: boolean;
  height?: number;
  borderRadius?: number;
}

export const Search: React.FC<SearchProps> = ({
  onPress,
  onClearText,
  onTextChange,
  onEndEditing,
  search,
  isShowFilter = false,
  onFilterPress,
  height = 40,
  borderRadius =15
}: SearchProps) => {
  const {colors} = useTheme<Theme>();
  const [value, setValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    setValue(search ?? '');
  }, [search]);

  const handleFocus = () => {
    setIsFocus(true);
    if (value === '') {
      onPress(false);
    }
  };
  const handleBlur = () => {
    setIsFocus(false);
    if (value === '') {
      onPress(true);
    }
  };
  const clearText = () => {
    setValue('');
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();
    }
    onClearText();
  };

  const handelOnChange = (text: string) => {
    setValue(text);
    onTextChange(text);
  };
  const handelOnFilter = (text: string) => {
    if (onFilterPress) {
      onFilterPress(text);
    }
  };

  return (
    <Box
      marginHorizontal={'srr'}
      paddingVertical={'ssr'}
      flexDirection={'row'}
      width={DeviceHelper.width() / 1.08}>
      <Box
        style={{
          backgroundColor: 'rgba(96, 126, 135, 0.12)',
          paddingHorizontal: 10,
        }}
        borderRadius={borderRadius}
        flexDirection={'row'}
        alignItems={'center'}
        overflow={'hidden'}
        flex={isShowFilter ? 0.9 : 1}
        height={DeviceHelper.calculateWidthRatio(
          DeviceHelper.isIos() ? 35 : height,
        )}
        minHeight={DeviceHelper.calculateHeightRatio(40)}>
        {!isFocus && !value && (
          <Image
            source={Images.search}
            height={DeviceHelper.calculateWidthRatio(20)}
            width={DeviceHelper.calculateWidthRatio(20)}
          />
        )}
        <TextInput
          style={{
            fontFamily: fonts.regular,
            fontSize: 16,
            lineHeight: 26.4,
            color: colors.dark,
            marginHorizontal: 8,
            paddingHorizontal: 3,
            overflow: 'hidden',
            flex: 1,
            paddingVertical: 0,
            paddingBottom: 6,
          }}
          autoCapitalize={'none'}
          placeholder={'Search'}
          placeholderTextColor={colors.grey}
          keyboardType={'default'}
          onChangeText={handelOnChange}
          onEndEditing={onEndEditing}
          value={value}
          onFocus={() => {
            handleFocus();
          }}
          onBlur={handleBlur}
        />
        {value && (
          <Pressable padding={'es'} onPress={clearText}>
            <Image
              source={Images.close}
              resizeMode={'contain'}
              height={DeviceHelper.calculateHeightRatio(16)}
              width={DeviceHelper.calculateWidthRatio(16)}
            />
          </Pressable>
        )}
      </Box>
    </Box>
  );
};
