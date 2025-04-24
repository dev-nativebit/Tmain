import { Result } from '@/core/Result';

export interface HttpGet<T> {
	get(...args: any): Promise<Result<T>>;
}
