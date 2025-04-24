import {CustomFieldValidator, CustomFormField} from '@/model';
import {
  CustomFieldValidatorDto,
  CustomFormFieldDto,
  CustomFormFieldType,
} from '@/dtos';
import {CustomFormFieldList} from '@/model/CustomFormFieldList';

export enum LoginFormIDs {
  userId = 'userId',
  password = 'password',
}
export enum RejectNotesIDs{
  notes = 'notes'
}

class CustomFormGenerator {
  private generateField(
    customFormFieldDto: CustomFormFieldDto,
  ): CustomFormField {
    return new CustomFormField(customFormFieldDto);
  }

  private generateValidator(
    customFileValidator: CustomFieldValidatorDto,
  ): CustomFieldValidator {
    return new CustomFieldValidator(customFileValidator);
  }

  generateLoginForm(): CustomFormFieldList {
    const fields: CustomFormFieldList = new CustomFormFieldList([]);
    fields.addItem(
      this.generateField({
        id: LoginFormIDs.userId,
        type: CustomFormFieldType.textInput,
        label: 'User ID',
        validator: this.generateValidator({
          required: true,
        }),
        textInputProps: {
          keyboardType: 'default',
          autoCapitalize: 'none',
        },
      }),
    );
    fields.addItem(
      this.generateField({
        id: LoginFormIDs.password,
        type: CustomFormFieldType.password,
        label: 'Password',
        validator: this.generateValidator({
          required: true,
        }),
        textInputProps: {
          secureTextEntry: true,
          autoCapitalize: 'none',
        },
      }),
    );
    return fields;
  }


  generateRejectNotesForm(): CustomFormFieldList {
    const fields: CustomFormFieldList = new CustomFormFieldList([]);
    fields.addItem(this.generateField({
      id: RejectNotesIDs.notes,
      type: CustomFormFieldType.textArea,
      label: "Notes",
      validator: this.generateValidator({
        required: true,
      }),
      textInputProps: {
        keyboardType: 'default',
        autoCapitalize: 'none',
      },
    }));
    return fields
  }

}

export const customFormGenerator = new CustomFormGenerator();
