import { Car } from '../../domain/Car';
import { CarRepository } from '../../domain/CarRepository';
import { ApplicationService } from '../../lib/ApplicationService';

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
};

export class CreateCarService implements ApplicationService<Request, Car> {
  private carRepository: CarRepository;

  constructor({ carRepository }: Dependencies) {
    this.carRepository = carRepository;
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

    if (existingCar) {
      throw new Error('This car already exists');
    }

    await this.carRepository.store(car);

    return car;
  }
}
