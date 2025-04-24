import {Model} from '@/model/core';
import {UserDetailDto} from '@/dtos';

export class UserModel extends Model<UserDetailDto> {
  public constructor(dto: UserDetailDto) {
    super(dto);
  }

  get loginId():string{
    return this.dto?.loginId ?? ''
  }
  get role():string{
    return this.dto?.role ?? ''
  }
  get roleName():string{
    return this.dto?.roleName ?? ''
  }
  get user_name():string{
    return this.dto?.user_name ?? ''
  }
  get user_code():string{
    return this.dto?.user_code ?? ''
  }
  get empId():string{
    return this.dto?.empId ?? ''
  }
  get superAuth():string{
    return this.dto?.superAuth ?? ''
  }
  get zoneId():string{
    return this.dto?.zoneId ?? ''
  }
  get customerId():string{
    return this.dto?.customerId ?? ''
  }
}
