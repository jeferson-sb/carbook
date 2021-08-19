import { asClass, createContainer } from 'awilix';

import { CreateRentalService } from './app/CreateRentalService';
import { ListRentalByUserService } from './app/ListRentalByUserService';
import { RentalRepository } from './domain/RentalRepository';
import { SQLRentalRepository } from './infra/repositories/SQLRentalRepository';

export type Container = {
  rentalRepository: RentalRepository;
  createRentalService: CreateRentalService;
  listRentalByUserService: ListRentalByUserService;
};

const container = createContainer<Container>();

container.register({
  rentalRepository: asClass(SQLRentalRepository).singleton(),
  createRentalService: asClass(CreateRentalService),
  listRentalByUserService: asClass(ListRentalByUserService),
});

export { container };
