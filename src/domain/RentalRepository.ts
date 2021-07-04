import { Rental } from './Rental';

export interface RentalRepository {
  getNextId(): string;
  findOpenRentalByCar(carId: string): Promise<Rental>;
  findOpenRentalByUser(userId: string): Promise<Rental>;
  store(rental: Rental): Promise<Rental>;
}
