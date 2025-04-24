import React, {useState} from 'react';
import {LayoutChangeEvent} from 'react-native';
import {Box} from '../Box';
import {
  FieldError,
  FieldErrorProps,
  LabelValuePair,
  MultiSelect,
} from '@/component';

export interface AuthDropDownProps extends FieldErrorProps {
  onSelect: (value: string) => void;
  selectedValue: string;
  formItems: LabelValuePair[];
  dependentItem?: LabelValuePair[];
  disabled?: boolean;
  infoDetails?: string;
  label: string;
  placeholder: string;
  hasError: boolean;
  isBottomMargin?: boolean;
  isDependentItem?: boolean;
  isSingleSelect?: boolean;
  isRequired?: boolean;
  onLayout?: (event: LayoutChangeEvent) => void;
  onPress: () => void;
  height?:number
}

export const AuthDropDown: React.FC<AuthDropDownProps> = (
  props: AuthDropDownProps,
) => {
  const {
    onSelect,
    selectedValue,
    formItems,
    disabled,
    label,
    placeholder,
    hasError,
    isBottomMargin,
    dependentItem,
    isDependentItem,
    isRequired,
    isSingleSelect = true,
    onLayout,
    onPress,
    height
  } = props;

  const fieldErrorProps = props as FieldErrorProps;

  const [visible, setVisible] = useState(false);

  return (
    <Box marginBottom={isBottomMargin ? 'srr' : 'none'} onLayout={onLayout}>
      <MultiSelect
        disabled={disabled}
        isSingleSelect={isSingleSelect}
        title={label}
        defaultSingleSelectedOption={selectedValue}
        placeholder={placeholder}
        bottomSheetLebal={`Select ${label}`}
        hasError={hasError}
        hidePlaceholder
        onPress={() => {
          setVisible(true);
          // onPress();
        }}
        onClose={() => {
          setVisible(false);
        }}
        onMultiSelectedButtonClick={() => {
          setVisible(false);
        }}
        onLabelPress={() => {
          setVisible(true);
        }}
        visible={visible}
        onMultiselected={() => {}}
        formItems={formItems}
        height={height}
        dependentItem={dependentItem}
        onValueChangeSingleSelect={answers => {
          setVisible(false);
          onSelect(answers?.value as string);
        }}
        isDependentItem={isDependentItem}
        onValueChangeMultiSelect={answers => {
          if (answers) {
            onSelect(
              answers?.map(answerItem => answerItem.value)?.join(',') ?? '',
            );
          }
        }}
        isRequired={isRequired ?? false}
      />
      <Box>
        <FieldError {...fieldErrorProps} />
      </Box>
    </Box>
  );
};
