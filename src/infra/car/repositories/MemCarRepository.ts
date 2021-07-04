import { v4 as uuidv4 } from 'uuid';

import { Car } from '../../../domain/Car';
import { CarRepository } from '../../../domain/CarRepository';

export class MemCarRepository implements CarRepository {
  private cars: Car[] = [];

  getNextId(): string {
    return uuidv4();
  }

  async store(car: Car): Promise<Car> {
    const index = this.cars.findIndex((c) => c.id === car.id);

    if (index !== -1) {
      this.cars[index] = car;
    } else {
      this.cars.push(car);
    }

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    brand: string,
    category_id: string,
    name: string,
  ): Promise<Car[]> {
    if (!brand && !category_id && !name) {
      return this.cars.filter((car) => car.available);
    }

    const cars = this.cars
      .filter((car) => car.available)
      .filter(
        (car) =>
          car.brand === brand ||
          car.category_id === category_id ||
          car.name === name,
      );

    return cars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}
