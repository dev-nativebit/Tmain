import React, {useMemo, useState} from 'react';
import {Box, FieldError, FieldErrorProps, Pressable, Text} from '@/component';
import {DeviceHelper} from '@/helper';
import {ResponsiveValue} from '@shopify/restyle';
import {fonts, Theme} from '@/style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {StyleSheet} from 'react-native';

export interface TimePickerProps extends FieldErrorProps {
  label: string;
  placeholder?: string;
  isLabelShow?: boolean;
  handleDateChange: (date?: Date) => void;
  selectedDate: string;
  isRequired: boolean;
  hasError?: boolean;
}

export const TimePicker: React.FC<TimePickerProps> = (
  props: TimePickerProps,
) => {
  const {
    label,
    placeholder,
    isLabelShow = true,
    selectedDate,
    handleDateChange,
    isRequired,
    hasError,
  } = props;
  const fieldErrorProps = props as FieldErrorProps;
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDateValue, setSelectedDateValue] = useState(selectedDate);

  useMemo(() => {
    setSelectedDateValue(selectedDate);
  }, [selectedDate]);

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
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.log(date);
    handleDateChange(date);
    hideDatePicker();
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
            showDatePicker();
          }}>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <Text
              fontSize={14}
              fontFamily={fonts.regular}
              paddingStart={'s'}
              color={'black'}>
              {selectedDateValue === ''
                ? ''
                : moment(selectedDateValue).format('hh:mm A')}
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
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={'time'}
        is24Hour={false}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
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
