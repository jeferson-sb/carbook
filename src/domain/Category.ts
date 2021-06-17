import { AggregateRoot } from '../lib/AggregateRoot';

interface CategoryData {
  id: string;
  name: string;
  description: string;
}

export class Category implements AggregateRoot<string> {
  private _id: string;

  private _name: string;

  private _description: string;

  static from({ id, name, description }: CategoryData): Category {
    const instance = new Category();

    instance._id = id;
    instance._name = name;
    instance._description = description;

    return instance;
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }
}
