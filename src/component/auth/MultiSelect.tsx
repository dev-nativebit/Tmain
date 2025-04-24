import React, {useEffect, useMemo, useState} from 'react';
import { ActivityIndicator, FlatList, Modal, StyleSheet } from "react-native";
import {Box} from '../Box';
import {fonts} from '@/style/Fonts';
import {Text} from '../Text';
import {Image} from '../Image';
import {Images} from '@/assets';
import {DeviceHelper} from '@/helper/DeviceHelper';
import {FilterListItem, Pressable} from '@/component';
import {LabelValuePair} from '../Types';
import {ResponsiveValue} from '@shopify/restyle';
import {Theme} from '@/style';

export interface MultiSelectProps {
  title: string;
  placeholder: string;
  bottomSheetLebal: string;
  onPress: () => void;
  onClose: () => void;
  onMultiSelectedButtonClick: () => void;
  visible: boolean;
  formItems: LabelValuePair[];
  onValueChangeMultiSelect?: (answers: LabelValuePair[]) => void;
  onValueChangeSingleSelect: (answers: LabelValuePair) => void;
  isSingleSelect?: boolean;
  defaultSingleSelectedOption?: string;
  onShow?: () => void;
  fetchMoreData?: () => void;
  isBottomLoading?: boolean;
  disabled?: boolean;
  searchCloseApiCall?: () => void;
  searchApiCall?: () => void;
  onChangeTextSearch?: (text: string) => void;
  height?: number;
  hasError?: boolean;
  hidePlaceholder?: boolean;
  dependentItem?: LabelValuePair[];
  isDependentItem?: boolean;
  isRequired: boolean;
  onMultiselected?: () => void;
  onLabelPress?: () => void;
}
export const MultiSelect: React.FC<MultiSelectProps> = ({
  title,
  placeholder,
  bottomSheetLebal,
  onPress,
  visible,
  onClose,
  formItems,
  dependentItem,
  onValueChangeMultiSelect,
  onValueChangeSingleSelect,
  onMultiSelectedButtonClick,
  isSingleSelect = false,
  defaultSingleSelectedOption,
  onShow,
  fetchMoreData,
  isBottomLoading = false,
  disabled = false,
  searchCloseApiCall,
  searchApiCall,
  onChangeTextSearch,
  height,
  hasError,
  hidePlaceholder,
  isDependentItem = false,
  isRequired,
  onMultiselected,
  onLabelPress,
}: MultiSelectProps) => {
  const [selectedOptions, setSelectedOptions] = useState<LabelValuePair[]>([]);
  const [selectedOptionsChips, setSelectedOptionsChips] = useState<
    LabelValuePair[]
  >([]);
  const [selectedItem, setSelectedItem] = useState<LabelValuePair>({
    label: '',
    value: defaultSingleSelectedOption ?? '',
    data: '',
  });

  useMemo(() => {
    const obj = {
      label: '',
      value: defaultSingleSelectedOption ?? '',
      data: '',
    };
    setSelectedItem(obj);
  }, [defaultSingleSelectedOption]);

  // console.log('selectedItem ==>', selectedItem);

  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(false);

  // console.log('bottomSheetLebal ==>', bottomSheetLebal);

  // console.log('LABEL', bottomSheetLebal);

  const items = isDependentItem ? dependentItem ?? [] : formItems;

  useEffect(() => {
    if (items?.length > 0) {
      if (isSingleSelect) {
        // console.log('CHECK==>', items);
        // console.log('CHECK==>', 'IS SINGLE SELECT');
        if (defaultSingleSelectedOption) {
          // console.log('CHECK==>', 'DEFAULT SELECTED OPTION');
          // console.log('CHECK==>', defaultSingleSelectedOption);
          const pair = items.find(item => {
            // console.log(
            // 	'CHECK_VALUE==>',
            // 	`${item.value} ${defaultSingleSelectedOption} ${
            // 		item.value.toString() === defaultSingleSelectedOption.toString()
            // 	}`,
            // );
            return (
              item.value.toString() === defaultSingleSelectedOption.toString()
            );
          });
          if (pair) {
            // console.log('CHECK==>', 'FOUND PAIR');
            const pairArray: LabelValuePair[] = [];
            pairArray.push(pair as LabelValuePair);

            setSelectedOptions(pairArray);
            setSelectedOptionsChips(pairArray);
            // console.log('UPDATES_SINGLE_SELECT');
          }
        } else {
          // console.log('CHECK==>', 'NO DEFAULT SELECTED OPTION');
          setSelectedOptions([]);
          setSelectedOptionsChips([]);
        }
      } else if (defaultSingleSelectedOption) {
        console.log('defaultSingleSelectedOption', defaultSingleSelectedOption);
        const splitArray = defaultSingleSelectedOption?.split(',');
        const pairArray: LabelValuePair[] = [];
        splitArray?.map(splitArrayItem => {
          const pair = items.find(
            item => item.value.toString() === splitArrayItem,
          );
          if (pair) {
            pairArray.push(pair as LabelValuePair);
          }
        });
        setSelectedOptions(pairArray);
        setSelectedOptionsChips(pairArray);
      } else {
        setSelectedOptions([]);
        setSelectedOptionsChips([]);
      }
    }
  }, [defaultSingleSelectedOption, isSingleSelect, items, visible]);

  useEffect(() => {}, [selectedOptionsChips, selectedOptions]);

  const renderFooter = () => (
    <Box marginBottom="r">
      {isBottomLoading && <ActivityIndicator size="small" color="#EF5366" />}
    </Box>
  );

  const borderColor = (): ResponsiveValue<
    keyof Theme['colors'],
    Theme['breakpoints']
  > => {
    if (hasError) {
      return 'red';
    }
    if (selectedOptionsChips[0]?.label) {
      return 'primaryColor';
    }
    return 'darkGray2';
  };


  return (
    <Box>
      <Box flexDirection="row" alignItems="center">
        <Text
          fontSize={14}
          fontFamily={fonts.regular}
          lineHeight={16}
          color={'slateGray'}
          letterSpacing={0.15}
          style={[
            styles.label,
            // @ts-ignore
            selectedOptionsChips[0]?.label && styles.labelFocused,
            // @ts-ignore
            selectedOptionsChips[0]?.label && styles.labelActive,
          ]}
          fontWeight={'500'}>
          {title}
          {isRequired && <Text color={'red'}>{'*'}</Text>}
        </Text>
      </Box>
      <Pressable onPress={onPress} disabled={disabled}>
        <Box
          borderWidth={1}
          borderRadius={5}
          flexDirection="row"
          flexWrap="nowrap"
          overflow="hidden"
          justifyContent="space-between"
          backgroundColor={disabled ? 'grey' : 'white'}
          minHeight={DeviceHelper.calculateHeightRatio(height ?? 40)}
          borderColor={borderColor()}>
          <Box
            flexDirection="row"
            flexWrap="wrap"
            flex={1}
            alignSelf="center"
            marginLeft="s">
            {isSingleSelect ? (
              <Box>
                <Text
                  color={selectedOptionsChips[0]?.label ? 'black' : 'gray'}
                  fontFamily={fonts.regular}
                  fontSize={14}
                  lineHeight={19.8}>
                  {selectedOptionsChips[0]?.label
                    ? selectedOptionsChips[0]?.label
                    : ''}
                </Text>
              </Box>
            ) : selectedOptionsChips.length > 0 ? (
              selectedOptionsChips.map((item, index) => (
                <Pressable
                  key={item?.value}
                  onPress={() => {
                    const tempOptions: LabelValuePair[] = [
                      ...selectedOptionsChips,
                    ];
                    const indexs = tempOptions.indexOf(item);
                    if (indexs !== -1) {
                      tempOptions.splice(index, 1);
                    }
                    setSelectedOptionsChips(tempOptions);
                    setSelectedOptions(tempOptions);

                    if (onValueChangeMultiSelect) {
                      onValueChangeMultiSelect(tempOptions);
                    }
                  }}>
                  <Box
                    borderWidth={1}
                    alignSelf="center"
                    borderRadius={6}
                    flexDirection="row"
                    marginEnd={'s'}
                    borderColor={'gray'}
                    backgroundColor={'white'}
                    paddingHorizontal={'es'}
                    paddingVertical={'es'}
                    marginVertical="es">
                    <Text
                      color="black"
                      fontFamily={fonts.regular}
                      fontSize={16}
                      lineHeight={19.8}>
                      {item.label ? item.label : ''}
                    </Text>
                  </Box>
                </Pressable>
              ))
            ) : (
              <Text
                color={'gray'}
                fontFamily={fonts.regular}
                fontSize={16}
                lineHeight={19.8}>
                {''}
              </Text>
            )}
          </Box>

          <Image
            flex={0.1}
            source={Images.downArrow}
            resizeMode={'contain'}
            marginStart="sr"
            alignSelf="center"
            marginRight="es"
            tintColor={'#98A2B3'}
            width={DeviceHelper.calculateWidthRatio(10)}
            height={DeviceHelper.calculateWidthRatio(10)}
          />
        </Box>
      </Pressable>
      <Modal
        animationType="fade"
        visible={visible}
        transparent
        onShow={() => {
          if (selectedOptionsChips.length > 0) {
            setSelectedOptions(selectedOptionsChips);
          }
          if (onShow) {
            onShow();
          }
        }}>
        <Box flex={1}>
          <Pressable
            flex={0.6} // add Trash then flex 0.4
            onPress={onClose}
          />
          <Box flex={0.4}>
            <Box
              flex={1}
              borderTopLeftRadius={16}
              borderTopRightRadius={16}
              backgroundColor={'bluish'}>
              <Box
                backgroundColor={'gray'}
                height={'1.5%'}
                width={'10%'}
                marginTop={'s'}
                borderRadius={5}
                alignSelf={'center'}
              />
              <Box flexDirection="column" marginHorizontal="r" flex={1}>
                <FlatList
                  onMomentumScrollBegin={() => {
                    setOnEndReachedCalledDuringMomentum(false);
                  }}
                  onEndReachedThreshold={0.1}
                  showsVerticalScrollIndicator={false}
                  onEndReached={() => {
                    if (!onEndReachedCalledDuringMomentum) {
                      if (fetchMoreData) {
                        fetchMoreData();
                      } // LOAD MORE DATA
                      setOnEndReachedCalledDuringMomentum(true);
                    }
                  }}
                  ListFooterComponent={() => renderFooter()}
                  data={items}
                  numColumns={2}
                  keyExtractor={item => item.label}
                  renderItem={({item}) => (
                    <FilterListItem
                      key={item.label}
                      title={item.label}
                      isSelected={
                        selectedOptions?.findIndex(
                          itemObj => item.value === itemObj.value,
                        ) > -1
                      }
                      onPress={() => {
                        if (isSingleSelect) {
                          const tempOptions: LabelValuePair[] = [];
                          tempOptions.push(item);
                          setSelectedOptions(tempOptions);
                          if (onValueChangeSingleSelect) {
                            onValueChangeSingleSelect(tempOptions[0]);
                          }
                          return;
                        }
                        const tempOptions: LabelValuePair[] = [
                          ...selectedOptions,
                        ];
                        const indexOfItem = tempOptions.findIndex(
                          itemObj => item.value === itemObj.value,
                        );
                        const isItemExist = indexOfItem > -1;

                        if (isItemExist) {
                          tempOptions.splice(indexOfItem, 1);
                        } else {
                          tempOptions.push(item);
                        }
                        if (onValueChangeMultiSelect) {
                          onValueChangeMultiSelect(tempOptions);
                        }
                        setSelectedOptions(tempOptions);
                      }}
                    />
                  )}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Modal>
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
    zIndex: 2,
    transform: [{translateY: -3}],
  },
  labelFocused: {
    transform: [{translateY: -21}],
  },
  labelActive: {
    color: '#2b96f1',
  },
  inputFocused: {
    borderColor: '#2b96f1',
  },
});
