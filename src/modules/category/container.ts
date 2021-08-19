import { asClass, createContainer } from 'awilix';

import { CreateCategoryService } from './app/CreateCategoryService';
import { ImportCategoryService } from './app/ImportCategoryService';
import { ListCategoryService } from './app/ListCategoryService';

import { CategoryRepository } from './domain/CategoryRepository';
import { SQLCategoryRepository } from './infra/repositories/SQLCategoryRepository';

export type Container = {
  categoryRepository: CategoryRepository;
  createCategoryService: CreateCategoryService;
  listCategoryService: ListCategoryService;
  importCategoryService: ImportCategoryService;
};

const container = createContainer<Container>();

container.register({
  categoryRepository: asClass(SQLCategoryRepository).singleton(),
  createCategoryService: asClass(CreateCategoryService).singleton(),
  listCategoryService: asClass(ListCategoryService).singleton(),
  importCategoryService: asClass(ImportCategoryService).singleton(),
});

export { container };
