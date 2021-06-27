import { Car } from '../../src/domain/Car';
import { CarRepository } from '../../src/domain/CarRepository';
import { MemCarRepository } from '../../src/infra/car/repositories/MemCarRepository';
import { ListCarService } from '../../src/application/car/ListCarService';

let listCarService: ListCarService;
let carRepository: CarRepository;

describe('List cars', () => {
  beforeEach(() => {
    carRepository = new MemCarRepository();
    listCarService = new ListCarService({ carRepository });
  });

  it('should be able to return all available cars', async () => {
    const car = await carRepository.store(
      new Car({
        id: carRepository.getNextId(),
        name: 'Audi A4',
        description: 'Car description',
        daily_rate: 80,
        license_plate: 'ABC-1234',
        fine_amount: 20,
        brand: 'Audi',
        category_id: 'category_id',
      }),
    );

    const cars = await listCarService.execute({});
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by name', async () => {
    const car = await carRepository.store(
      new Car({
        id: carRepository.getNextId(),
        name: 'Audi A4',
        description: 'Car description',
        daily_rate: 80,
        license_plate: 'ABC-1234',
        fine_amount: 20,
        brand: 'Audi',
        category_id: 'category_id',
      }),
    );

    const cars = await listCarService.execute({ name: 'Audi A4' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by brand', async () => {
    const car = await carRepository.store(
      new Car({
        id: carRepository.getNextId(),
        name: 'Duster',
        description: 'Car description',
        daily_rate: 80,
        license_plate: 'ABC-1234',
        fine_amount: 20,
        brand: 'Renault',
        category_id: 'category_id',
      }),
    );

    const cars = await listCarService.execute({ brand: 'Renault' });
    expect(cars).toEqual([car]);
  });

  it('should be able to list all available cars by category', async () => {
    const car = await carRepository.store(
      new Car({
        id: carRepository.getNextId(),
        name: 'Clio',
        description: 'Car description',
        daily_rate: 80,
        license_plate: 'ABC-1234',
        fine_amount: 20,
        brand: 'Renault',
        category_id: '12345',
      }),
    );

    const cars = await listCarService.execute({ category_id: '12345' });
    expect(cars).toEqual([car]);
  });
});
