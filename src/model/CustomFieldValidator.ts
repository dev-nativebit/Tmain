import { CustomFieldValidatorDto } from '@/dtos';
import { Model } from '@/model/core/model';

export class CustomFieldValidator extends Model<CustomFieldValidatorDto> {
	public constructor(dto:CustomFieldValidatorDto) {
		super(dto);
	}

	get required(): boolean {
		return this.dto?.required ?? false;
	}
	get regX() : RegExp | undefined {
		return this.dto?.regX;
	}
	get errorMessage() : string {
		return this.dto?.errorMessage ?? '';
	}
}
