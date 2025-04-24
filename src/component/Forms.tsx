import React from 'react';
import {Control, Controller, FieldErrors, FieldValues} from 'react-hook-form';
import {CustomFormFieldList} from '@/model/CustomFormFieldList';
import {CustomFormFieldType} from '@/dtos';
import {
  AuthDropDown,
  AuthInput,
  Box,
  DateInput,
  LabelValuePair,
  TimePicker,
} from '@/component';
import {
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form/dist/types/form';
import { ResponsiveValue } from "@shopify/restyle";
import { Theme } from "@/style";
import { FormRadioButton } from "@/component/FormRadioButton";

export interface FormsProps {
  fieldArray: CustomFormFieldList;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
  setValue?: UseFormSetValue<any>;
  getValues?: UseFormGetValues<any>;
  isShowLabel?: boolean;
  isBottomBorder?: boolean;
  onInputPress?: () => void;
  isFieldDisabled?: (id: string) => boolean;
  dependentItem?: LabelValuePair[];
  onVerify?: () => void;
  minDate?: string;
  maxDate?: string;
  marginHorizontal?: ResponsiveValue<keyof Theme['spacing'], Theme['breakpoints']>;
}

export const Forms: React.FC<FormsProps> = ({
  fieldArray,
  control,
  errors,
  setValue,
  isShowLabel = true,
  isBottomBorder = false,
  onInputPress,
  isFieldDisabled,
  dependentItem,
  onVerify,
  maxDate,
  minDate,
  marginHorizontal = 'r',
}: FormsProps) => {
  const handleInputPress = () => {
    if (onInputPress) {
      onInputPress();
    }
  };

  const handleIsFieldDisabled = (id: string) => {
    if (isFieldDisabled) {
      return isFieldDisabled(id);
    } else {
      return false;
    }
  };

  return (
    <Box marginHorizontal={marginHorizontal}>
      {fieldArray.map(formField => (
        <Controller
          key={formField.id}
          control={control}
          defaultValue={formField.value}
          name={formField.name}
          rules={{
            ...formField.rules(),
          }}
          render={({field: {value, onChange}}) => (
            <>
              {(formField.type === CustomFormFieldType.textInput ||
                formField.type === CustomFormFieldType.password) &&
                !formField.isHidden && (
                  <AuthInput
                    {...formField.textInputProps}
                    fieldType={formField.type}
                    label={formField.label}
                    value={value}
                    onChangeText={onChange}
                    height={50}
                    hasError={!!errors[`${formField.id}`]}
                    errorType={String(errors[`${formField.id}`]?.type)}
                    placeholderLabel={formField.label}
                    error={errors[`${formField.id}`]}
                    isRequired={formField.isRequired()}
                    isShowLabel={isShowLabel}
                    isBottomBorder={isBottomBorder}
                    onPress={() => {}}
                    disable={false}
                    onVerify={onVerify}
                    isBottomMargin={true}
                  />
                )}
              {formField.type === CustomFormFieldType.dropdown &&
                !formField.isHidden && (
                  <AuthDropDown
                    onLayout={() => {}}
                    placeholder={formField.label}
                    label={formField.label}
                    formItems={formField.options as LabelValuePair[]}
                    onSelect={dropdownValue => {
                      if (setValue) {
                        setValue(formField.name, dropdownValue, {
                          shouldValidate: true,
                        });
                      }
                    }}
                    selectedValue={value}
                    hasError={!!errors[`${formField.name}`]}
                    errorType={String(errors[`${formField.name}`]?.type)}
                    placeholderLabel={formField.label}
                    error={errors[`${formField.name}`]}
                    isRequired={formField.isRequired()}
                    onPress={() => {}}
                    isBottomMargin={true}
                    disabled={handleIsFieldDisabled(formField.name)}
                    dependentItem={dependentItem}
                  />
                )}
              {formField.type === CustomFormFieldType.textArea &&
                !formField.isHidden && (
                  <AuthInput
                    {...formField.textInputProps}
                    fieldType={formField.type}
                    label={formField.label}
                    value={value}
                    multiline={true}
                    height={90}
                    onChangeText={onChange}
                    hasError={!!errors[`${formField.id}`]}
                    errorType={String(errors[`${formField.id}`]?.type)}
                    placeholderLabel={formField.label}
                    error={errors[`${formField.id}`]}
                    isRequired={formField.isRequired()}
                    isShowLabel={true}
                    isBottomMargin={true}
                    onPress={() => {}}
                  />
                )}
              {formField.type === CustomFormFieldType.date && (
                  <DateInput
                    label={formField.label}
                    placeholder={formField.label}
                    selectedDate={value}
                    handleDateChange={date => {
                      onChange(date.dateString);
                    }}
                    isRequired={formField.isRequired()}
                    hasError={!!errors[`${formField.name}`]}
                    errorType={String(errors[`${formField.name}`]?.type)}
                    placeholderLabel={formField.label}
                    error={errors[`${formField.name}`]}
                    maxDate={maxDate ?? ''}
                    minDate={minDate ?? ''}
                  />
                )}
              {formField.type === CustomFormFieldType.multiSelection &&
                !formField.isHidden && (
                  <AuthDropDown
                    onLayout={() => {}}
                    placeholder={formField.label}
                    label={formField.label}
                    formItems={formField.options as LabelValuePair[]}
                    onSelect={dropdownValue => {
                      if (setValue) {
                        setValue(formField.name, dropdownValue, {
                          shouldValidate: true,
                        });
                      }
                    }}
                    isSingleSelect={false}
                    selectedValue={value}
                    hasError={!!errors[`${formField.name}`]}
                    errorType={String(errors[`${formField.name}`]?.type)}
                    placeholderLabel={formField.label}
                    error={errors[`${formField.name}`]}
                    isRequired={formField.isRequired()}
                    onPress={() => {}}
                    disabled={handleIsFieldDisabled(formField.name)}
                    dependentItem={dependentItem}
                    isBottomMargin={true}
                  />
                )}
              {formField.type === CustomFormFieldType.time &&
                formField.isHidden && (
                  <TimePicker
                    label={formField.label}
                    placeholder={formField.label}
                    selectedDate={value}
                    handleDateChange={date => {
                      onChange(date?.toString());
                    }}
                    isRequired={formField.isRequired()}
                    placeholderLabel={formField.label}
                    errorType={String(errors[`${formField.name}`]?.type)}
                    error={errors[`${formField.name}`]}
                    hasError={!!errors[`${formField.name}`]}
                  />
                )}
              {formField.type === CustomFormFieldType.radioButton && (
                  <FormRadioButton
                    onPress={onChange}
                    selected={value}
                    option={formField.options as LabelValuePair[]}
                    label={formField.label}
                    isRequired={formField.isRequired()}
                  />
                )}
            </>
          )}
        />
      ))}
    </Box>
  );
};
