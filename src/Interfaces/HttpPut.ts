import { Result } from '@/core/Result';

export interface HttpPut<T> {
	put(...args: any): Promise<Result<T>>;
}
