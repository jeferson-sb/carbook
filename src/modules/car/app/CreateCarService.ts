import { HTTPError } from '@presentation/api/errors/HTTPError';
import { ApplicationService } from '@lib/ApplicationService';

import { Car } from '../domain/Car';
import { CarRepository } from '../domain/CarRepository';
import { CategoryRepository } from '../../category/domain/CategoryRepository';

interface Request {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

type Dependencies = {
  carRepository: CarRepository;
  categoryRepository: CategoryRepository;
};

export class CreateCarService implements ApplicationService<Request, Car> {
  private carRepository: CarRepository;

  private categoryRepository: CategoryRepository;

  constructor({ carRepository, categoryRepository }: Dependencies) {
    this.carRepository = carRepository;
    this.categoryRepository = categoryRepository;
  }

  async execute({
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand,
    category_id,
  }: Request): Promise<Car> {
    const existingCar = await this.carRepository.findByLicensePlate(
      license_plate,
    );
    const car = new Car({
      id: this.carRepository.getNextId(),
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
    });

    const category = this.categoryRepository.findById(category_id);

    if (!category) {
      throw new HTTPError('This category does not exist');
    }

    if (existingCar) {
      throw new HTTPError('This car already exists');
    }

    await this.carRepository.store(car);

    return car;
  }
}
