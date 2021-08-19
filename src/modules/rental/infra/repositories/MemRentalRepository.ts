import { v4 as uuidv4 } from 'uuid';

import { Rental } from '../../domain/Rental';
import { RentalRepository } from '../../domain/RentalRepository';

export class MemRentalRepository implements RentalRepository {
  private rentals: Rental[] = [];

  getNextId(): string {
    return uuidv4();
  }

  async findOpenRentalByCar(carId: string): Promise<Rental | null> {
    return (
      this.rentals.find(rental => rental.carId === carId && !rental.endDate) ||
      null
    );
  }

  async findOpenRentalByUser(userId: string): Promise<Rental | null> {
    return (
      this.rentals.find(
        rental => rental.userId === userId && !rental.endDate,
      ) || null
    );
  }

  async store(rental: Rental): Promise<Rental> {
    this.rentals.push(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental | null> {
    return this.rentals.find(rental => rental.id === id) || null;
  }

  async findByUserId(userId: string): Promise<Rental[]> {
    return this.rentals.filter(rental => rental.userId === userId);
  }
}
