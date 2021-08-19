import { CreateCarService } from '@modules/car/app/CreateCarService';
import { CarRepository } from '@modules/car/domain/CarRepository';
import { CategoryRepository } from '@modules/category/domain/CategoryRepository';
import { MemCarRepository } from '@modules/car/infra/repositories/MemCarRepository';
import { MemCategoryRepository } from '@modules/category/infra/repositories/MemCategoryRepository';
import { HTTPError } from '@presentation/api/errors/HTTPError';

let createCarService: CreateCarService;
let carRepository: CarRepository;
let categoryRepository: CategoryRepository;

describe('Create car', () => {
  beforeEach(() => {
    carRepository = new MemCarRepository();
    categoryRepository = new MemCategoryRepository();
    createCarService = new CreateCarService({
      carRepository,
      categoryRepository,
    });
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
    }).rejects.toBeInstanceOf(HTTPError);
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
