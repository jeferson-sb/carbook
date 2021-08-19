import { Car } from './Car';

export interface CarRepository {
  getNextId(): string;
  store(car: Car): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car | null>;
  findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]>;
  findById(id: string): Promise<Car | null>;
  updateAvailability(id: string, availability: boolean): Promise<void>;
}
