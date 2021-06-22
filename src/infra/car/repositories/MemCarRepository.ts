import { v4 as uuidv4 } from 'uuid';

import { Car } from '../../../domain/Car';
import { CarRepository } from '../../../domain/CarRepository';

export class MemCarRepository implements CarRepository {
  private cars: Car[] = [];

  getNextId(): string {
    return uuidv4();
  }

  async store(car: Car): Promise<Car> {
    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}
