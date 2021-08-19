import { asClass, createContainer } from 'awilix';
import { CreateCarSpecificationService } from '../car/app/CreateCarSpecificationService';

import { CreateSpecificationService } from './app/CreateSpecificationService';
import { SpecificationRepository } from './domain/SpecificationRepository';
import { SQLSpecificationRepository } from './infra/repositories/SQLSpecificationRepository';

export type Container = {
  specificationRepository: SpecificationRepository;
  createSpecificationService: CreateSpecificationService;
  createCarSpecificationService: CreateCarSpecificationService;
};

const container = createContainer<Container>();

container.register({
  specificationRepository: asClass(SQLSpecificationRepository).singleton(),
  createSpecificationService: asClass(CreateSpecificationService).singleton(),
  createCarSpecificationService: asClass(
    CreateCarSpecificationService,
  ).singleton(),
});

export { container };
