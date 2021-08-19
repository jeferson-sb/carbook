import { Car } from '@modules/car/domain/Car';
import { Specification } from '@modules/specification/domain/Specification';
import { SpecificationRepository } from '@modules/specification/domain/SpecificationRepository';
import { MemCarRepository } from '@modules/car/infra/repositories/MemCarRepository';
import { HTTPError } from '@presentation/api/errors/HTTPError';
import { MemSpecificationRepository } from '@modules/specification/infra/repositories/MemSpecificationRepository';
import { CreateCarSpecificationService } from '@modules/car/app/CreateCarSpecificationService';

let createCarSpecificationService: CreateCarSpecificationService;
let carRepository: MemCarRepository;
let specificationRepository: SpecificationRepository;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carRepository = new MemCarRepository();
    specificationRepository = new MemSpecificationRepository();
    createCarSpecificationService = new CreateCarSpecificationService({
      carRepository,
      specificationRepository,
    });
  });

  it('should be able to add a new specification to the car', async () => {
    const car = await carRepository.store(
      new Car({
        id: carRepository.getNextId(),
        name: 'Car A',
        description: 'Description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand XYZ',
        category_id: 'category',
      }),
    );

    await specificationRepository.store(
      new Specification({
        id: specificationRepository.getNextId(),
        name: 'spec',
        description: 'Description of a specification',
      }),
    );

    const specification = await specificationRepository.findByName('spec');

    const specifications_id = [specification?.id ?? '12345'];

    await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id,
    });

    const carByLicense = await carRepository.findByLicensePlate('ABC-1234');
    expect(carByLicense).toHaveProperty('specifications');
    expect(carByLicense?.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification to a non-existing car', async () => {
    expect(async () => {
      const car_id = '1234';
      const specifications_id = ['54321'];
      await createCarSpecificationService.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(HTTPError);
  });
});
