import {TextInputProps} from 'react-native';
import {Entity} from '@/model/core/entity';
import {LabelValuePair} from '@/component';
import {
  CustomFieldValidatorDto,
  CustomFormFieldDto,
  CustomFormFieldType,
  TypeCustomValidation,
} from '@/dtos';
import {CustomFieldValidator} from '@/model/CustomFieldValidator';

export class CustomFormField extends Entity<CustomFormFieldDto> {
  public constructor(dto: CustomFormFieldDto) {
    super(dto, 'id');
  }

  get name(): string {
    return this.dto?.id ?? '';
  }

  get label(): string {
    return this.dto?.label ?? '';
  }
  get value(): string {
    return this.dto?.value ?? '';
  }
  get options(): Array<string> | LabelValuePair[] {
    return this.dto?.options ?? [];
  }
  get type(): CustomFormFieldType {
    return this.dto?.type ?? CustomFormFieldType.none;
  }
  get secureTextEntry(): boolean {
    return this.dto?.secureTextEntry ?? false;
  }
  get isRightComponent(): boolean {
    return this.dto?.isRightComponent ?? false;
  }
  get isHidden(): boolean {
    return this.dto?.isHidden ?? false;
  }
  get isHorizontal(): boolean {
    return this.dto?.isHorizontal ?? false;
  }
  get textInputProps(): TextInputProps {
    return this.dto?.textInputProps ?? {};
  }
  get placeholder(): string {
    return this.dto?.placeholder ?? '';
  }
  get validator(): CustomFieldValidator {
    return new CustomFieldValidator(
      this?.dto?.validator as CustomFieldValidatorDto,
    );
  }

  isRequired(): boolean {
    return this.validator.required ?? false;
  }

  rules(customValidation?: TypeCustomValidation) {
    const validations: Record<string, (value: any) => string | undefined> = {};
    if (this.validator.regX) {
      validations.validator = (value: any) => {
        if (value && !this.validator.regX?.test(value)) {
          return this.validator.errorMessage;
        }
        return undefined;
      };
    }
    return {
      required: this.isRequired(),
      validate: {...validations, ...customValidation},
    };
  }
}
