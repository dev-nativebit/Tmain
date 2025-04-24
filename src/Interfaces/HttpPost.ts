import { Result } from '@/core/Result';

export interface HttpPost<T> {
	post(...args: any): Promise<Result<T>>;
}
