export interface IResult {
  isSuccess: boolean;
  isFailure: boolean;
  isWaiting: boolean;
  isEmpty: boolean;
}

export class Result<T> implements IResult {
  public isSuccess: boolean;
  public isFailure: boolean;
  public isWaiting: boolean;
  public error?: string;
  data?: T;
  message?: string;

  private constructor(
    isSuccess: boolean,
    isWaiting: boolean,
    error?: string,
    data?: T,
    message?:string,
  ) {
    if (!isWaiting && isSuccess && error) {
      throw new Error('Invalid Operation');
    }
    if (!isWaiting && !isSuccess && !error) {
      throw new Error('Invalid Operation');
    }

    this.isWaiting = isWaiting;
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.data = data;
    this.message = message ?? '';

    Object.freeze(this);
  }

  public getValue(): T {
    if (this.isWaiting || this.isFailure) {
      return {} as T;
    }
    if (!this.isSuccess) {
      throw new Error('No data found');
    }
    return this.data as T;
  }

  get isEmpty(): boolean {
    return (Array.isArray(this.data) && this.data.length === 0);
  }
  public static ok<U>(value?: U): Result<U> {
    if (value) {
      const mValue = value as Object;
      // @ts-ignore
      const mMessage  = mValue ? mValue?.hasOwnProperty('message') ? Object.values(mValue?.message) : '' : '';
      // @ts-ignore
      // console.log('mValue ==>', mValue.status);
      // console.log('mValue ==>', mValue.message);
      if (mValue.hasOwnProperty('status')) {
        // @ts-ignore
        if (mValue?.status === 1 || mValue?.status === true) {
          // @ts-ignore
          return new Result<U>(true, false, undefined, value?.data ?
            value?.data : value, value?.message ?? '');
        }
        // @ts-ignore
        if (mValue?.status === 2) {
          // @ts-ignore
          return new Result<U>(false, false, 'unauthorised', undefined, mMessage);
        }
        // @ts-ignore
        return new Result<U>(false, false, mValue?.message, undefined, mMessage);
      }
      // console.log('DDDDD');
      // @ts-ignore
      return new Result<U>(true, false, undefined, value, mMessage);
    }

    // @ts-ignore
    return new Result<U>(true, false, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    // @ts-ignore
    return new Result<U>(false, false, error,  '');
  }

  public static waiting<U>(): Result<U> {
    return new Result<U>(false, true);
  }

  // combine several results and determine the overall success or failure states
  public static combine(results: Result<any>[]): Result<any> {
    for (let index = 0; index < results.length; index += 1) {
      if (results[index].isFailure || results[index].isWaiting) {
        return results[index];
      }
    }
    return Result.ok<any>();
  }
}
