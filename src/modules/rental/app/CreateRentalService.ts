import { DateProvider } from '@lib/DateProvider';
import { HTTPError } from '@presentation/api/errors/HTTPError';
import { ApplicationService } from '@lib/ApplicationService';

import { CarRepository } from '@modules/car/domain/CarRepository';
import { Rental } from '../domain/Rental';
import { RentalRepository } from '../domain/RentalRepository';

interface Request {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

type Dependencies = {
  rentalRepository: RentalRepository;
  dateProvider: DateProvider;
  carRepository: CarRepository;
};

export class CreateRentalService
  implements ApplicationService<Request, Rental>
{
  private rentalRepository: RentalRepository;

  private dateProvider: DateProvider;

  private carRepository: CarRepository;

  constructor({ rentalRepository, dateProvider, carRepository }: Dependencies) {
    this.rentalRepository = rentalRepository;
    this.dateProvider = dateProvider;
    this.carRepository = carRepository;
  }

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: Request): Promise<Rental> {
    const availableCar = await this.rentalRepository.findOpenRentalByCar(carId);

    if (availableCar) throw new HTTPError('Car is unavailable');

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      userId,
    );

    if (rentalOpenToUser) {
      throw new HTTPError('There is a rental in progress for this user.');
    }

    const now = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(now, expectedReturnDate);

    if (!Rental.isValidAvailableTime(compare)) {
      throw new HTTPError('Invalid return time');
    }

    const rentalId = this.rentalRepository.getNextId();
    const finalRental = Rental.from({
      id: rentalId,
      userId,
      carId,
      expectedReturnDate,
    });

    await this.rentalRepository.store(finalRental);

    this.carRepository.updateAvailability(rentalId, false);

    return finalRental;
  }
}
