import { Model } from './model';

export type EntityId = string | number;

/**
 * Base method for all the entities
 * T is a DTO
 */
export abstract class Entity<T extends Record<string, any>> extends Model<T> {
	private readonly _id: EntityId;

	/**
   * @param dto Entity Dto
   * @param idKey If primary key name is not 'id' by default, pass it here.
   */
	constructor(dto: T, idKey?: string) {
		super(dto);
		this._id = dto[idKey ?? 'id'] as EntityId;
	}

	get id(): EntityId {
		return this._id;
	}
}
