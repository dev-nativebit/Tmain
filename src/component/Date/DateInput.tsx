import React, {useMemo, useState} from 'react';
import {
  Box,
  CalenderBottomSheet,
  FieldError,
  FieldErrorProps,
  Pressable,
  Text,
} from '@/component';
import {DeviceHelper} from '@/helper';
import {DateData} from 'react-native-calendars/src/types';
import {ResponsiveValue} from '@shopify/restyle';
import {fonts, Theme} from '@/style';
import { StyleSheet } from "react-native";

export interface DateInputProps extends FieldErrorProps {
  label: string;
  placeholder?: string;
  isLabelShow?: boolean;
  handleDateChange: (date: DateData) => void;
  selectedDate: string;
  isRequired: boolean;
  hasError?: boolean;
  minDate: string;
  maxDate: string;
}

export const DateInput: React.FC<DateInputProps> = (props: DateInputProps) => {
  const {
    label,
    placeholder,
    isLabelShow = true,
    selectedDate,
    handleDateChange,
    isRequired,
    hasError,
    maxDate,
    minDate,
  } = props;
  const fieldErrorProps = props as FieldErrorProps;
  const [isVisibleCalender, setIsVisibleCalender] = useState(false);
  const [selectedDateValue, setSelectedDateValue] = useState(selectedDate);

  useMemo(() => {
    setSelectedDateValue(selectedDate);
  }, [selectedDate]);

  const handleOnClose = () => {
    setIsVisibleCalender(false);
  };

  const borderColor = (): ResponsiveValue<
    keyof Theme['colors'],
    Theme['breakpoints']
  > => {
    if (hasError) {
      return 'red';
    }
    if (selectedDate) {
      return 'primaryColor';
    }
    return 'darkGray2';
  };
  return (
    <Box marginBottom={'sr'}>
      <Box>
        {isLabelShow && (
          <Text
            fontSize={14}
            fontFamily={fonts.regular}
            lineHeight={16}
            color={'slateGray'}
            letterSpacing={0.15}
            style={[
              styles.label,
              // @ts-ignore
              selectedDate && styles.labelFocused,
              // @ts-ignore
              selectedDate && styles.labelActive,
            ]}
            fontWeight={'500'}>
            {label}
            {isRequired && <Text color={'red'}>{'*'}</Text>}
          </Text>
        )}
        <Pressable
          backgroundColor={'white'}
          justifyContent={'center'}
          borderColor={borderColor()}
          borderWidth={1}
          height={DeviceHelper.calculateHeightRatio(40)}
          borderRadius={5}
          onPress={() => {
            setIsVisibleCalender(true);
          }}>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            paddingStart={'s'}>
            <Text
              fontSize={14}
              fontFamily={fonts.regular}
              color={'black'}>
              {selectedDateValue === '' ? '' : selectedDateValue}
            </Text>
            {/*<SvgIcon*/}
            {/*	name={'date'}*/}
            {/*	height={DeviceHelper.calculateWidthRatio(16)}*/}
            {/*	width={DeviceHelper.calculateWidthRatio(16)}*/}
            {/*	pressableProps={{ style:{ paddingEnd: 8 } }}*/}
            {/*	fill={'white'}*/}
            {/*/>*/}
          </Box>
        </Pressable>
        <Box>
          <FieldError {...fieldErrorProps} />
        </Box>
      </Box>
      <CalenderBottomSheet
        setDate={() => {
          setIsVisibleCalender(false);
        }}
        handleDateChange={handleDateChange}
        isVisible={isVisibleCalender}
        onClose={handleOnClose}
        selectedDate={selectedDateValue}
        handleOnClen={() => {
          setSelectedDateValue('');
          setIsVisibleCalender(false);
        }}
        minDate={minDate}
        maxDate={maxDate}
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
    color: '#2b96f1',
  },
  labelActive: {
    color: '#2b96f1',
  },
  inputFocused: {
    borderColor: '#2b96f1',
  },
});
