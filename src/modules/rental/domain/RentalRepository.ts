import { Rental } from './Rental';

export interface RentalRepository {
  getNextId(): string;
  findOpenRentalByCar(carId: string): Promise<Rental | null>;
  findOpenRentalByUser(userId: string): Promise<Rental | null>;
  store(rental: Rental): Promise<Rental>;
  findById(id: string): Promise<Rental | null>;
  findByUserId(userId: string): Promise<Rental[]>;
}
