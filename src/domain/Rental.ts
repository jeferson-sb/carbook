import { AggregateRoot } from '../lib/AggregateRoot';

interface RentalProps {
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

  static from({
    id,
    userId,
    carId,
    expectedReturnDate,
    startDate,
    endDate,
    total,
  }: RentalProps): Rental {
    const instance = new Rental();

    instance._id = id;
    instance._userId = userId;
    instance._carId = carId;
    instance._startDate = startDate || new Date();
    instance._endDate = endDate || null;
    instance._total = total || 0;
    instance._expectedReturnDate = expectedReturnDate;

    return instance;
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
