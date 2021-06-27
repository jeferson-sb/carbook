import { Car } from '../../domain/Car';
import { CarRepository } from '../../domain/CarRepository';
import { SpecificationRepository } from '../../domain/SpecificationRepository';
import { HTTPError } from '../../infra/http/HTTPError';
import { ApplicationService } from '../../lib/ApplicationService';

interface Request {
  car_id: string;
  specifications_id: string[];
}

type Dependencies = {
  carRepository: CarRepository;
  specificationRepository: SpecificationRepository;
};

export class CreateCarSpecificationService
  implements ApplicationService<Request, Car>
{
  private carRepository: CarRepository;

  private specificationRepository: SpecificationRepository;

  constructor({ carRepository, specificationRepository }: Dependencies) {
    this.carRepository = carRepository;
    this.specificationRepository = specificationRepository;
  }

  async execute({ car_id, specifications_id }: Request): Promise<Car> {
    const existingCar = await this.carRepository.findById(car_id);

    if (!existingCar) {
      throw new HTTPError('Car does not exists!');
    }

    const specifications = await this.specificationRepository.findByIds(
      specifications_id,
    );

    [...specifications].forEach((spec) => {
      existingCar.addSpecification(spec);
    });

    await this.carRepository.store(existingCar);

    return existingCar;
  }
}
