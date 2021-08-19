import { ApplicationService } from '@lib/ApplicationService';

import { Rental } from '../domain/Rental';
import { RentalRepository } from '../domain/RentalRepository';

type Dependencies = {
  rentalRepository: RentalRepository;
};

export class ListRentalByUserService
  implements ApplicationService<Request, Rental>
{
  private rentalRepository: RentalRepository;

  constructor({ rentalRepository }: Dependencies) {
    this.rentalRepository = rentalRepository;
  }

  async execute(userId: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalRepository.findByUserId(userId);
    return rentalByUser;
  }
}
