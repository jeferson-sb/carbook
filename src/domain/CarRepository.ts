import { Car } from './Car';

export interface CarRepository {
  getNextId(): string;
  store(car: Car): Promise<Car>;
  findByLicensePlate(license_plate: string): Promise<Car>;
}
