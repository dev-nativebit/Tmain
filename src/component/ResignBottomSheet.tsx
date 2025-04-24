import React from 'react';
import {Box, Button, Forms, Image, Pressable} from '@/component';
import Modal from 'react-native-modal';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper';
import {CustomFormFieldList} from '@/model';
import {Control, FieldErrors, FieldValues} from 'react-hook-form';
import {UseFormSetValue} from "react-hook-form/dist/types/form";

export interface ResignBottomSheetProps {
    isVisible: boolean;
    onClose: () => void;
    fieldArray:CustomFormFieldList
    control:Control<FieldValues>
    errors:FieldErrors<FieldValues>
    setValue?: UseFormSetValue<any>
    onSavePress: () =>void
}

export const ResignBottomSheet:React.FC<ResignBottomSheetProps> = ({
    isVisible,
    onClose,
    onSavePress,
    errors,
    fieldArray,
    control,
    setValue
}:ResignBottomSheetProps) =>{
    return(
        <Modal
            testID="modal"
            isVisible={isVisible}
            onModalHide={onClose}
            onBackButtonPress={onClose}
            onSwipeComplete={onClose}
            backdropTransitionOutTiming={0}
            statusBarTranslucent={true}
            style={{
                justifyContent: 'flex-end',
                margin: 0,
            }}
        >
            <Pressable flex={1}>
                <Pressable onPress={onClose}  justifyContent={'center'}  flex={1}>
                    <Box
                        backgroundColor={'white'}
                        borderRadius={10}
                        marginHorizontal={'r'}
                    >
                        <Box flexDirection={'row'} justifyContent={'flex-end'}>

                            <Pressable
                                onPress={onClose}
                                justifyContent={'center'}
                                alignItems={'center'}
                                paddingVertical={'s'}
                                marginEnd={'e6'}
                                marginTop={'es'}
                                paddingHorizontal={'ssr'}
                                alignSelf={'flex-end'}
                            >
                                <Image
                                    source={Images.close}
                                    height={DeviceHelper.calculateWidthRatio(15)}
                                    width={DeviceHelper.calculateWidthRatio(15)}
                                    resizeMode={'contain'}
                                />
                            </Pressable>
                        </Box>
                        <Box
                            paddingBottom={'m'}
                        >
                            <Forms
                                fieldArray={fieldArray}
                                control={control}
                                errors={errors}
                                setValue={setValue}
                            />
                            <Box marginHorizontal={'r'} marginTop={'m'}>
                                <Button
                                    label={'Save'}
                                    backgroundColor={'green'}
                                    onPress={onSavePress}
                                />
                            </Box>
                        </Box>
                    </Box>
                </Pressable>
            </Pressable>
        </Modal>
    )
}
