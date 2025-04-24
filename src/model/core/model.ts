/**
 * Base method for all the entities
 * T is a DTO
 */
export abstract class Model<T extends Record<string, any>> {
	protected readonly dto: T;

	constructor(dto: T) {
		this.dto = dto;
	}

	getDto(): T {
		// Build dto from data if required
		return { ...this.dto };
	}
}
