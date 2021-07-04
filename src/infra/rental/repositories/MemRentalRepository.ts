import { v4 as uuidv4 } from 'uuid';

import { Rental } from '../../../domain/Rental';
import { RentalRepository } from '../../../domain/RentalRepository';

export class MemRentalRepository implements RentalRepository {
  private rentals: Rental[] = [];

  getNextId(): string {
    return uuidv4();
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.carId === carId && !rental.endDate,
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    return this.rentals.find(
      (rental) => rental.userId === userId && !rental.endDate,
    );
  }

  async store(rental: Rental): Promise<Rental> {
    this.rentals.push(rental);

    return rental;
  }
}
