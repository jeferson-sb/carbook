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

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder('c')
      .where('available = :available', { available: true });

    if (brand) carsQuery.andWhere('c.brand = :brand', { brand });
    if (name) carsQuery.andWhere('c.name = :name', { name });
    if (category_id)
      carsQuery.andWhere('c.category_id = :category_id', { category_id });

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id);
    return car;
  }
}
