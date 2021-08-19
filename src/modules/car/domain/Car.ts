import { AggregateRoot } from '@lib/AggregateRoot';

import { Specification } from '../../specification/domain/Specification';

interface CarData {
  id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  available?: boolean;
}

export class Car implements AggregateRoot<string> {
  private _id: string;

  private _name: string;

  private _description: string;

  private _daily_rate: number;

  private _available: boolean;

  private _license_plate: string;

  private _fine_amount: number;

  private _brand: string;

  private _category_id: string;

  private _specifications: Specification[];

  constructor({
    id,
    name,
    description,
    daily_rate,
    available = true,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: CarData) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._daily_rate = daily_rate;
    this._available = available;
    this._license_plate = license_plate;
    this._fine_amount = fine_amount;
    this._brand = brand;
    this._category_id = category_id;
    this._specifications = [];
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

  get daily_rate(): number {
    return this._daily_rate;
  }

  get available(): boolean {
    return this._available;
  }

  get license_plate(): string {
    return this._license_plate;
  }

  get fine_amount(): number {
    return this._fine_amount;
  }

  get brand(): string {
    return this._brand;
  }

  get category_id(): string {
    return this._category_id;
  }

  get specifications(): Specification[] {
    return this._specifications;
  }

  addSpecification(specification: Specification): void {
    this._specifications.push(specification);
  }
}
