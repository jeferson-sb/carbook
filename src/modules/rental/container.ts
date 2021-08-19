import { DayjsDateProvider } from '@infrastructure/providers/DayjsDateProvider';
import { DateProvider } from '@lib/DateProvider';
import { CarRepository } from '@modules/car/domain/CarRepository';
import { SQLCarRepository } from '@modules/car/infra/repositories/SQLCarRepository';
import { asClass, createContainer } from 'awilix';

import { CreateRentalService } from './app/CreateRentalService';
import { ListRentalByUserService } from './app/ListRentalByUserService';
import { RentalRepository } from './domain/RentalRepository';
import { SQLRentalRepository } from './infra/repositories/SQLRentalRepository';

export type Container = {
  rentalRepository: RentalRepository;
  carRepository: CarRepository;
  createRentalService: CreateRentalService;
  listRentalByUserService: ListRentalByUserService;
  dateProvider: DateProvider;
};

const container = createContainer<Container>();

container.register({
  rentalRepository: asClass(SQLRentalRepository).singleton(),
  carRepository: asClass(SQLCarRepository).singleton(),
  createRentalService: asClass(CreateRentalService).singleton(),
  listRentalByUserService: asClass(ListRentalByUserService).singleton(),
  dateProvider: asClass(DayjsDateProvider).singleton(),
});

export { container };
