import { Result } from '@/core/Result';

export interface HttpDelete<T> {
	delete(...args: any): Promise<Result<T>>;
}
