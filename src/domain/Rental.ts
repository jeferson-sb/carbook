import { AggregateRoot } from '../lib/AggregateRoot';

interface RentalData {
  id: string;
  userId: string;
  carId: string;
  expectedReturnDate: Date;
  startDate?: Date;
  endDate?: Date;
  total?: number;
}

export class Rental implements AggregateRoot<string> {
  private _id: string;

  private _carId: string;

  private _userId: string;

  private _startDate: Date;

  private _endDate: Date;

  private _expectedReturnDate: Date;

  private _total: number;

  constructor({ id, userId, carId, expectedReturnDate }: RentalData) {
    this._id = id;
    this._userId = userId;
    this._carId = carId;
    this._startDate = new Date();
    this._endDate = null;
    this._total = 0;
    this._expectedReturnDate = expectedReturnDate;
  }

  static isValidAvailableTime(dateCompare: number | Date): boolean {
    const minimumHour = 24;
    return dateCompare > minimumHour;
  }

  get id(): string {
    return this._id;
  }

  get carId(): string {
    return this._carId;
  }

  get userId(): string {
    return this._userId;
  }

  get startDate(): Date {
    return this._startDate;
  }

  get endDate(): Date {
    return this._endDate;
  }

  get expectedReturnDate(): Date {
    return this._expectedReturnDate;
  }

  get total(): number {
    return this._total;
  }
}
