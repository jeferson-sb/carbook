import dayjs from 'dayjs';

import { HTTPError } from '@presentation/api/errors/HTTPError';
import { CreateRentalService } from '@modules/rental/app/CreateRentalService';
import { Car } from '@modules/car/domain/Car';
import { CarRepository } from '@modules/car/domain/CarRepository';
import { MemCarRepository } from '@modules/car/infra/repositories/MemCarRepository';
import { DayjsDateProvider } from '@infrastructure/providers/DayjsDateProvider';
import { MemRentalRepository } from '@modules/rental/infra/repositories/MemRentalRepository';

let createRentalService: CreateRentalService;
let rentalRepository: MemRentalRepository;
let dateProvider: DayjsDateProvider;
let carRepository: CarRepository;

describe('Create Rental', () => {
  const oneDayAfter = dayjs().add(2, 'day').toDate();

  beforeEach(() => {
    rentalRepository = new MemRentalRepository();
    dateProvider = new DayjsDateProvider();
    carRepository = new MemCarRepository();
    createRentalService = new CreateRentalService({
      rentalRepository,
      dateProvider,
      carRepository,
    });
  });

  it('should be able to create a new rental', async () => {
    const car = await carRepository.store(
      new Car({
        id: carRepository.getNextId(),
        name: 'Test',
        description: 'Car test',
        daily_rate: 100,
        license_plate: 'test',
        fine_amount: 40,
        category_id: '1234',
        brand: 'generic',
      }),
    );
    const rental = await createRentalService.execute({
      userId: '12345',
      carId: car.id,
      expectedReturnDate: oneDayAfter,
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  describe('when there is a existing rental for the same user', () => {
    it('should not be able to create a new rental', async () => {
      expect(async () => {
        await createRentalService.execute({
          userId: '12345',
          carId: '121212',
          expectedReturnDate: oneDayAfter,
        });

        await createRentalService.execute({
          userId: '12345',
          carId: '121212',
          expectedReturnDate: oneDayAfter,
        });
      }).rejects.toBeInstanceOf(HTTPError);
    });
  });

  describe('when there is a existing rental for the same car', () => {
    it('should not be able to create a new rental', async () => {
      expect(async () => {
        await createRentalService.execute({
          userId: '123',
          carId: 'test',
          expectedReturnDate: oneDayAfter,
        });

        await createRentalService.execute({
          userId: '321',
          carId: 'test',
          expectedReturnDate: oneDayAfter,
        });
      }).rejects.toBeInstanceOf(HTTPError);
    });
  });

  describe('when return time is invalid', () => {
    it('should not be able to create a new rental', async () => {
      expect(async () => {
        await createRentalService.execute({
          userId: '123',
          carId: 'test',
          expectedReturnDate: dayjs().toDate(),
        });
      }).rejects.toBeInstanceOf(HTTPError);
    });
  });
});
