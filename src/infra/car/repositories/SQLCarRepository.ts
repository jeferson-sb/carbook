import { Repository, getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Car } from '../../../domain/Car';

import { CarRepository } from '../../../domain/CarRepository';
import { CarEntity } from '../typeorm/CarEntity';

export class SQLCarRepository implements CarRepository {
  private repository: Repository<CarEntity>;

  constructor() {
    this.repository = getRepository(CarEntity);
  }

  getNextId(): string {
    return uuidv4();
  }

  async store(carData: Car): Promise<Car> {
    const car = this.repository.create(carData);
    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate });
    return car;
  }
}
