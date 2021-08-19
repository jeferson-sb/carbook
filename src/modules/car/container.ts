import { asClass, createContainer } from 'awilix';

import { CreateCarService } from './app/CreateCarService';
import { ListCarService } from './app/ListCarService';
import { CarImageRepository } from './domain/CarImageRepository';
import { CarRepository } from './domain/CarRepository';
import { SQLCarImageRepository } from './infra/repositories/SQLCarImageRepository';
import { SQLCarRepository } from './infra/repositories/SQLCarRepository';
import { UploadCarImagesService } from './app/UploadCarImagesService';

export type Container = {
  carRepository: CarRepository;
  carImageRepository: CarImageRepository;
  createCarService: CreateCarService;
  listCarService: ListCarService;
  uploadCarImagesService: UploadCarImagesService;
};

const container = createContainer<Container>();

container.register({
  carRepository: asClass(SQLCarRepository).singleton(),
  carImageRepository: asClass(SQLCarImageRepository).singleton(),
  createCarService: asClass(CreateCarService).singleton(),
  listCarService: asClass(ListCarService).singleton(),
  uploadCarImagesService: asClass(UploadCarImagesService),
});

export { container };
