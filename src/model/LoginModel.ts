import {Model} from '@/model/core';
import {LoginDto} from '@/dtos';
import {UserModel} from '@/model/UserModel';

export class LoginModel extends Model<LoginDto> {
  public constructor(dto: LoginDto) {
    super(dto);
  }

  get sign(): string {
    return this.dto?.sign ?? '';
  }
  get authToken(): string {
    return this.dto?.authToken ?? '';
  }
  get userDetail(): UserModel {
    return new UserModel(this.dto?.userDetail);
  }
}
