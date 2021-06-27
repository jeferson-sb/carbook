import { Car } from '../../src/domain/Car';
import { Specification } from '../../src/domain/Specification';
import { SpecificationRepository } from '../../src/domain/SpecificationRepository';
import { MemCarRepository } from '../../src/infra/car/repositories/MemCarRepository';
import { HTTPError } from '../../src/infra/http/HTTPError';
import { MemSpecificationRepository } from '../../src/infra/specification/repositories/MemSpecificationRepository';
import { CreateCarSpecificationService } from '../../src/application/car/CreateCarSpecificationService';

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

    const specifications_id = [specification.id];

    await createCarSpecificationService.execute({
      car_id: car.id,
      specifications_id,
    });

    const c = await carRepository.findByLicensePlate('ABC-1234');
    expect(c).toHaveProperty('specifications');
    expect(c.specifications.length).toBe(1);
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
