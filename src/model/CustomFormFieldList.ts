import {CustomFormFieldDto} from '@/dtos';
import {CustomFormField} from '@/model/CustomFormField';
import {List} from '@/model/core/List';

export class CustomFormFieldList extends List<CustomFormField> {
  constructor(dtos?: CustomFormFieldDto[]) {
    super(dtos, CustomFormField, false);
  }
}
