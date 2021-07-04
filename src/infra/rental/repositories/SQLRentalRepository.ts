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

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    const openRental = await this.repository.findOne({ car_id: carId });
    return openRental;
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const openRental = await this.repository.findOne({ user_id: userId });
    return openRental;
  }

  async store(rental: Rental): Promise<Rental> {
    const result = this.repository.create({
      id: rental.id,
      user_id: rental.userId,
      car_id: rental.carId,
      expected_return_date: rental.expectedReturnDate,
    });

    await this.repository.save(result);

    return result;
  }
}
