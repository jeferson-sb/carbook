import { AggregateRoot } from '../lib/AggregateRoot';

interface SpecificationData {
  id: string;
  name: string;
  description: string;
}

export class Specification implements AggregateRoot<string> {
  private _id: string;

  private _name: string;

  private _description: string;

  constructor({ id, name, description }: SpecificationData) {
    this._id = id;
    this._name = name;
    this._description = description;
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

  snapshot(): SpecificationData {
    return {
      id: this._id,
      name: this._name,
      description: this._description,
    };
  }
}
