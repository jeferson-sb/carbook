import { asClass, createContainer } from 'awilix';

import { CreateCarService } from './app/CreateCarService';
import { ListCarService } from './app/ListCarService';
import { CarImageRepository } from './domain/CarImageRepository';
import { CarRepository } from './domain/CarRepository';
import { SQLCarImageRepository } from './infra/repositories/SQLCarImageRepository';
import { SQLCarRepository } from './infra/repositories/SQLCarRepository';
import { UploadCarImagesService } from './app/UploadCarImagesService';
import { CategoryRepository } from '@modules/category/domain/CategoryRepository';
import { SQLCategoryRepository } from '@modules/category/infra/repositories/SQLCategoryRepository';

export type Container = {
  carRepository: CarRepository;
  categoryRepository: CategoryRepository;
  carImageRepository: CarImageRepository;
  createCarService: CreateCarService;
  listCarService: ListCarService;
  uploadCarImagesService: UploadCarImagesService;
};

const container = createContainer<Container>();

container.register({
  carRepository: asClass(SQLCarRepository).singleton(),
  categoryRepository: asClass(SQLCategoryRepository).singleton(),
  carImageRepository: asClass(SQLCarImageRepository).singleton(),
  createCarService: asClass(CreateCarService).singleton(),
  listCarService: asClass(ListCarService).singleton(),
  uploadCarImagesService: asClass(UploadCarImagesService),
});

export { container };
