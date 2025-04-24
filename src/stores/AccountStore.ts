import {makeAutoObservable} from 'mobx';
import {Storage} from '@/core/Storage';
import { LoginModel } from '@/model';

class AccountStore {
  private mAuthToken: string = '';
  constructor() {
    makeAutoObservable(this);
  }

  get authToken(): string {
    return this.mAuthToken ?? '';
  }

  set authToken(token: string) {
    this.mAuthToken = token;
  }

  async login(loginData: LoginModel) {
    await Storage.setItemAsync(Storage.keys.login, JSON.stringify(loginData));
  }
}

export const accountStore = new AccountStore();
