import _ from 'lodash';
import {action, computed, makeObservable, observable} from 'mobx';

type CustomClass<T> = new (...args: any[]) => T;
export type Id = string | number;
type Entity<T> = T & {id: Id};
type Iterator<T, U> = (item: T, index: number) => U;

export abstract class List<
  T extends {id?: Id; getDto?: () => any},
  V = unknown,
> {
  readonly items: Array<T & {id: Id; getDto?: () => T}>;
  protected readonly extraData: V;
  readonly Type: CustomClass<T>;
  readonly generateId: boolean;

  static hasDuplicateIds = <X extends {id: Id}>(items: Array<X>): boolean => {
    const group = _.groupBy(items, item => item.id);
    return _.some(group, _items => _items.length > 1);
  };

  /**
   * List of items
   * @param rawData Data to be modelled as list items
   * @param Type Class name to instantiate items
   * @param generateId Generates ids automatically for items
   * @param extraData Additional parameters for data model apart from dto
   */
  constructor(
    rawData: any[] = [],
    Type: CustomClass<T>,
    generateId = false,
    extraData: V | undefined = undefined,
  ) {
    this.items = [] as Array<Entity<T>>;
    // @ts-ignore
    this.extraData = extraData;
    this.Type = Type;
    this.generateId = generateId;

    _.each(rawData, (item: any) => {
      const hasId = !!item?.id;

      const newItem = new Type(item, extraData) as Entity<T>;

      if (!hasId && this.generateId) {
        _.set(newItem, 'id', _.uniqueId('list_item_'));
      }

      if (!newItem.id) {
        throw new Error('All the list items must have an id');
      }

      this.addItem(newItem);
    });

    if (List.hasDuplicateIds(this.items)) {
      throw new Error('List contains duplicate items');
    }

    makeObservable<List<T>, any>(this, {
      items: observable,
      size: computed,
      addItem: action,
      addItems: action,
      updateItem: action,
      removeItem: action,
      clear: action,
      replace: action,
      merge: action,
      reverse: action,
      splice: action,
      sort: action,
    });
  }

  get size(): number {
    return this.items.length;
  }

  addItem(item: Entity<T> | T): List<T> {
    if (!item.id && this.generateId) {
      _.set(item, 'id', _.uniqueId('list_item_'));
    }

    if (this.getItemById(item.id ?? '')) {
      this.updateItem(item as Entity<T>);
    } else {
      this.items.push(item as Entity<T>);
    }

    return this;
  }

  addItems(items: Array<Entity<T>>): List<T> {
    _.each(items, item => this.addItem(item));
    return this;
  }

  updateItem(updatedItem: Entity<T>): List<T> {
    if (updatedItem && this.hasItems()) {
      const hasItem = this.getItemById(updatedItem.id);

      if (hasItem) {
        const index = _.findIndex(
          this.items,
          item => item.id === updatedItem.id,
        );
        this.items[index] = updatedItem;
      }
    }

    return this;
  }

  updateItemByIndex(updatedItem: Entity<T>, index: number): List<T> {
    if (updatedItem && this.hasItems()) {
      const hasItem = this.getItemByIndex(index);

      if (hasItem) {
        this.items[index] = updatedItem;
      }
    }

    return this;
  }

  removeItem(id: Id): List<T> {
    const deleteIndex = _.findIndex(this.items, item => item.id === id);

    if (deleteIndex >= 0) {
      this.items.splice(deleteIndex, 1);
    }

    return this;
  }

  clear(): List<T> {
    while (this.hasItems()) {
      this.items.pop();
    }
    return this;
  }

  replace(items: Array<Entity<T>>): List<T> {
    this.clear().addItems(items);
    return this;
  }

  merge(list: List<T>): List<T> {
    this.addItems(list.items);
    return this;
  }

  hasItems(): boolean {
    return this.size > 0;
  }

  isEmpty(): boolean {
    return !this.hasItems();
  }

  getIds(): Id[] {
    return _.map(this.items, item => item.id);
  }

  getItemById(id: Id): T | undefined {
    return _.find(this.items, item => item.id === id);
  }

  getItemByIndex(index: number): T | undefined {
    return index < this.size ? this.items[index] : undefined;
  }

  first(): T | undefined {
    return _.first(this.items);
  }

  last(): T | undefined {
    return _.last(this.items);
  }

  find(iterator: (item: T) => boolean): T | undefined {
    return _.find(this.items, iterator);
  }

  findIndex(iterator: (item: T) => boolean): number {
    return _.findIndex(this.items, iterator);
  }

  getFilteredList<X extends List<T>>(
    iterator: (item: T) => boolean,
    list: X,
  ): X {
    list.addItems(_.filter(this.items, iterator));
    return list;
  }

  getIndex(id: Id): number {
    return _.findIndex(this.items, item => item.id === id);
  }

  reverse(): List<T> {
    this.items.reverse();
    return this;
  }

  map<U>(iterator: Iterator<T, U>): U[] {
    return _.map(this.items, iterator);
  }

  each<U>(iterator: Iterator<T, U>): void {
    _.each(this.items, iterator);
  }

  some(iterator: (item: T, index: number) => boolean): void {
    _.some(this.items, iterator);
  }

  filter(iterator: (item: T, index?: number) => boolean): T[] {
    return _.filter(this.items, iterator);
  }

  forEach<U>(iterator: Iterator<T, U>): T[] {
    return _.forEach(this.items, iterator);
  }

  orderBy<U>(iterator: Iterator<T, U>, isDescending?: boolean): void {
    const orderedItems = _.orderBy(this.items, iterator, [
      isDescending ? 'desc' : 'asc',
    ]);

    this.replace(orderedItems);
  }

  splice(start: number, deleteCount = 1): List<T> {
    this.items.splice(start, deleteCount);
    return this;
  }

  slice(start?: number, end?: number): T[] {
    return this.items.slice(start, end);
  }

  sort(compareFn?: (a: T, b: T) => number): List<T> {
    this.items.sort(compareFn);
    return this;
  }

  uniqueBy(fieldName: string): T[] {
    return _.uniqBy(this.items, fieldName);
  }

  getDtos(): T[] {
    const dtos = this.map(item => item.getDto?.());
    return dtos.filter(dto => !!dto) as T[];
  }

  getDtosNew() {
    return this.map(item => item.getDto?.());
  }
}
