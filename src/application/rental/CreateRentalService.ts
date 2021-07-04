import { DateProvider } from '../../domain/DateProvider';
import { Rental } from '../../domain/Rental';
import { RentalRepository } from '../../domain/RentalRepository';
import { HTTPError } from '../../infra/http/HTTPError';
import { ApplicationService } from '../../lib/ApplicationService';

interface Request {
  userId: string;
  carId: string;
  expectedReturnDate: Date;
}

type Dependencies = {
  rentalRepository: RentalRepository;
  dateProvider: DateProvider;
};

export class CreateRentalService
  implements ApplicationService<Request, Rental>
{
  private rentalRepository: RentalRepository;

  private dateProvider: DateProvider;

  constructor({ rentalRepository, dateProvider }: Dependencies) {
    this.rentalRepository = rentalRepository;
    this.dateProvider = dateProvider;
  }

  async execute({
    userId,
    carId,
    expectedReturnDate,
  }: Request): Promise<Rental> {
    const availableCar = await this.rentalRepository.findOpenRentalByCar(carId);

    if (availableCar) {
      throw new HTTPError('Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalRepository.findOpenRentalByUser(
      userId,
    );

    if (rentalOpenToUser) {
      throw new HTTPError('There is a rental in progress for this user.');
    }

    const now = this.dateProvider.dateNow();
    const compare = this.dateProvider.compareInHours(now, expectedReturnDate);

    if (Rental.isValidAvailableTime(compare)) {
      throw new Error('Invalid return time');
    }

    const rentalId = this.rentalRepository.getNextId();
    const rental = await this.rentalRepository.store(
      new Rental({
        id: rentalId,
        userId,
        carId,
        expectedReturnDate,
      }),
    );

    return rental;
  }
}
