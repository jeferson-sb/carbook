import { getRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Rental } from '../../../domain/Rental';
import { RentalRepository } from '../../../domain/RentalRepository';
import { RentalEntity } from '../typeorm/RentalEntity';

export class SQLRentalRepository implements RentalRepository {
  private repository: Repository<RentalEntity>;

  constructor() {
    this.repository = getRepository(RentalEntity);
  }

  getNextId(): string {
    return uuidv4();
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | undefined> {
    const openRental = await this.repository.findOne({
      where: { car_id: carId, end_date: null },
    });

    if (!openRental) return undefined;

    return Rental.from({
      id: openRental.id,
      carId: openRental.car_id,
      userId: openRental.user_id,
      expectedReturnDate: openRental.expected_return_date,
      startDate: openRental.start_date,
      endDate: openRental.end_date,
      total: openRental.total,
    });
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const openRental = await this.repository.findOne({
      where: { user_id: userId, end_date: null },
    });

    if (!openRental) return undefined;

    return Rental.from({
      id: openRental.id,
      carId: openRental.car_id,
      userId: openRental.user_id,
      expectedReturnDate: openRental.expected_return_date,
      startDate: openRental.start_date,
      endDate: openRental.end_date,
      total: openRental.total,
    });
  }

  async store({
    id,
    userId,
    carId,
    expectedReturnDate,
    endDate,
    total,
  }: Rental): Promise<Rental> {
    const result = this.repository.create({
      id,
      user_id: userId,
      car_id: carId,
      expected_return_date: expectedReturnDate,
      end_date: endDate,
      total,
    });

    await this.repository.save(result);

    return Rental.from({
      id: result.id,
      carId: result.car_id,
      userId: result.user_id,
      expectedReturnDate: result.expected_return_date,
    });
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id);

    if (!rental) return undefined;

    return Rental.from({
      id: rental.id,
      carId: rental.car_id,
      userId: rental.user_id,
      expectedReturnDate: rental.expected_return_date,
      startDate: rental.start_date,
      endDate: rental.end_date,
      total: rental.total,
    });
  }

  async findByUserId(userId: string): Promise<Rental[]> {
    const rentals = await this.repository.find({
      where: { user_id: userId },
      relations: ['car'],
    });

    return rentals;
  }
}
