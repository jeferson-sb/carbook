import { CreateCarService } from '../../src/application/car/CreateCarService';
import { CarRepository } from '../../src/domain/CarRepository';
import { MemCarRepository } from '../../src/infra/car/repositories/MemCarRepository';

let createCarService: CreateCarService;
let carRepository: CarRepository;

describe('Create car', () => {
  beforeEach(() => {
    carRepository = new MemCarRepository();
    createCarService = new CreateCarService({ carRepository });
  });

  it('should be able to create a new user', async () => {
    await createCarService.execute({
      name: 'Toyota',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });
  });

  it('should not be able to create a car with existing license plate', async () => {
    expect(async () => {
      await createCarService.execute({
        name: 'Car 1',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });

      await createCarService.execute({
        name: 'Car 2',
        description: 'Car description',
        daily_rate: 100,
        license_plate: 'ABC-1234',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it('should be able to create a car with available true by default', async () => {
    const car = await createCarService.execute({
      name: 'Car 1',
      description: 'Car description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    });

    expect(car.available).toBe(true);
  });
});
