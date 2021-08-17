import { CarRepository } from '../../domain/CarRepository';
import { DateProvider } from '../../domain/DateProvider';
import { Rental } from '../../domain/Rental';
import { RentalRepository } from '../../domain/RentalRepository';
import { HTTPError } from '../../infra/http/HTTPError';
import { ApplicationService } from '../../lib/ApplicationService';

interface Request {
  rentalId: string;
  userId: string;
}

type Dependencies = {
  rentalRepository: RentalRepository;
  carRepository: CarRepository;
  dateProvider: DateProvider;
};

export class RefundRentalService
  implements ApplicationService<Request, Rental>
{
  private rentalRepository: RentalRepository;

  private carRepository: CarRepository;

  private dateProvider: DateProvider;

  constructor({ rentalRepository, carRepository, dateProvider }: Dependencies) {
    this.rentalRepository = rentalRepository;
    this.carRepository = carRepository;
    this.dateProvider = dateProvider;
  }

  async execute({ rentalId, userId }: Request): Promise<Rental> {
    const minimumDaily = 1;

    const rental = await this.rentalRepository.findById(rentalId);
    const car = await this.carRepository.findById(rental.carId);

    if (!rental) throw new HTTPError('Rental does not exists!');

    const now = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(rental.startDate, now);

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.compareInDays(
      now,
      rental.expectedReturnDate,
    );

    let total = 0;

    if (delay) {
      const calculateFine = delay * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    const finalRental = Rental.from({
      id: this.rentalRepository.getNextId(),
      carId: rental.carId,
      expectedReturnDate: rental.expectedReturnDate,
      userId: rental.userId,
      startDate: rental.startDate,
      endDate: now,
      total,
    });

    await this.rentalRepository.store(finalRental);
    await this.carRepository.updateAvailability(car.id, true);

    return finalRental;
  }
}
