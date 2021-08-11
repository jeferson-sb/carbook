import dayjs from 'dayjs';

import { CreateRentalService } from '../../src/application/rental/CreateRentalService';
import { CarRepository } from '../../src/domain/CarRepository';
import { Rental } from '../../src/domain/Rental';
import { MemCarRepository } from '../../src/infra/car/repositories/MemCarRepository';
import { DayjsDateProvider } from '../../src/infra/providers/DayjsDateProvider';
import { MemRentalRepository } from '../../src/infra/rental/repositories/MemRentalRepository';

let createRentalService: CreateRentalService;
let rentalRepository: MemRentalRepository;
let dateProvider: DayjsDateProvider;
let carRepository: CarRepository;

describe('Create Rental', () => {
  const oneDayAfter = dayjs().add(1, 'day').toDate();

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
    const rental = await createRentalService.execute(
      new Rental({
        id: rentalRepository.getNextId(),
        userId: '12345',
        carId: '121212',
        expectedReturnDate: oneDayAfter,
      }),
    );

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
  });

  describe('when there is a existing rental for the same user', () => {
    it('should not be able to create a new rental', async () => {
      expect(async () => {
        await createRentalService.execute(
          new Rental({
            id: rentalRepository.getNextId(),
            userId: '12345',
            carId: '121212',
            expectedReturnDate: oneDayAfter,
          }),
        );

        await createRentalService.execute(
          new Rental({
            id: rentalRepository.getNextId(),
            userId: '12345',
            carId: '121212',
            expectedReturnDate: oneDayAfter,
          }),
        );
      }).rejects.toBeInstanceOf(Error);
    });
  });

  describe('when there is a existing rental for the same car', () => {
    it('should not be able to create a new rental', async () => {
      expect(async () => {
        await createRentalService.execute(
          new Rental({
            id: rentalRepository.getNextId(),
            userId: '123',
            carId: 'test',
            expectedReturnDate: oneDayAfter,
          }),
        );

        await createRentalService.execute(
          new Rental({
            id: rentalRepository.getNextId(),
            userId: '321',
            carId: 'test',
            expectedReturnDate: oneDayAfter,
          }),
        );
      }).rejects.toBeInstanceOf(Error);
    });
  });

  describe('when return time is invalid', () => {
    it('should not be able to create a new rental', async () => {
      expect(async () => {
        await createRentalService.execute(
          new Rental({
            id: rentalRepository.getNextId(),
            userId: '123',
            carId: 'test',
            expectedReturnDate: dayjs().toDate(),
          }),
        );
      }).rejects.toBeInstanceOf(Error);
    });
  });
});
