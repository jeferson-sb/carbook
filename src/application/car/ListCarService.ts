import { Car } from '../../domain/Car';
import { CarRepository } from '../../domain/CarRepository';
import { ApplicationService } from '../../lib/ApplicationService';

interface Request {
  name?: string;
  brand?: string;
  category_id?: string;
}

type Dependencies = {
  carRepository: CarRepository;
};

export class ListCarService implements ApplicationService<Request, Car[]> {
  private carRepository: CarRepository;

  constructor({ carRepository }: Dependencies) {
    this.carRepository = carRepository;
  }

  async execute({ name, category_id, brand }: Request): Promise<Car[]> {
    const cars = await this.carRepository.findAvailable(
      brand,
      category_id,
      name,
    );
    return cars;
  }
}
