import React from 'react';
import {Modal} from 'react-native';
import {Box} from './Box';
import {Pressable} from './Pressable';
import {Text} from './Text';
import {Image} from './Image';
import {Images} from '@/assets';
import {fonts} from '@/style';
import {DeviceHelper} from '@/helper';

export interface SelectImageOptionProps {
  Visible: boolean;
  onClose: () => void;
  onCameraPress: () => void;
  onGalleryPress: () => void;
}

export const SelectImageOption: React.FC<SelectImageOptionProps> = ({
  Visible,
  onClose,
  onGalleryPress,
  onCameraPress,
}: SelectImageOptionProps) => {
  const imageOption = [
    {
      image: Images.gallery,
      onPress: () => {
        onGalleryPress();
      },
      label: 'Gallery',
    },
    {
      image: Images.camera,
      onPress: () => {
        onCameraPress();
      },
      label: 'Camera',
    },
  ];
  return (
    <Modal
      onRequestClose={onClose}
      animationType={'fade'}
      visible={Visible}
      transparent={true}>
      <Box flex={1} backgroundColor={'transparent'}>
        <Pressable
          flex={0.75} // add Trash then flex 0.4
          onPress={() => {
            onClose();
          }}
        />
        <Box
          flex={0.25}
          backgroundColor={'white'}
          borderTopLeftRadius={16}
          borderTopRightRadius={16}>
          <Box justifyContent={'center'}>
            <Box
              flexDirection={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
              marginTop={'m'}>
              <Text
                fontFamily={fonts.bold}
                fontSize={16}
                color={'black'}
                paddingStart={'r'}>
                {'Choose from'}
              </Text>
              <Pressable
                onPress={onClose}
                width={50}
                alignItems={'center'}
                justifyContent={'center'}>
                <Image height={20} width={20} source={Images.close} />
              </Pressable>
            </Box>
            <Box
              flexDirection={'row'}
              justifyContent={'center'}
              marginTop={'r'}
              alignItems={'center'}>
              {imageOption.map((value, index) => {
                return (
                  <>
                    <Pressable
                      key={index}
                      flex={1}
                      onPress={value.onPress}
                      height={DeviceHelper.calculateHeightRatio(120)}
                      width={DeviceHelper.calculateWidthRatio(120)}
                      alignItems={'center'}
                      justifyContent={'center'}>
                      <Image
                        height={DeviceHelper.calculateHeightRatio(90)}
                        width={DeviceHelper.calculateWidthRatio(90)}
                        resizeMode={'contain'}
                        source={value.image}
                      />
                      <Text
                        fontSize={14}
                        color={'black'}
                        fontFamily={fonts.bold}>
                        {value.label}
                      </Text>
                    </Pressable>
                    {/*{index + 1 < imageOption.length ? (*/}
                    {/*  <SvgIcon name={'line'} height={'70%'} />*/}
                    {/*) : null}*/}
                  </>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
