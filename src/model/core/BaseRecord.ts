/**
 * Base method for local entities whose state can be updated
 * T is a state
 */
export abstract class BaseRecord<T extends Record<string, any>> {
  protected state: T;

  constructor(state: T) {
    this.state = state;
  }

  get id(): string {
    return this.state?.id;
  }

  // eslint-disable-next-line class-methods-use-this
  protected getTimestamp(): number {
    return new Date().valueOf();
  }

  getState(): T {
    return this.state;
  }
}
