import { asClass, createContainer } from 'awilix';

import { AuthenticateUserService } from '../../application/user/AuthenticateUserService';
import { CategoryRepository } from '../../domain/CategoryRepository';
import { CreateCategoryService } from '../../application/category/CreateCategoryService';
import { CreateSpecificationService } from '../../application/specification/CreateSpecificationService';
import { CreateUserService } from '../../application/user/CreateUserService';
import { ImportCategoryService } from '../../application/category/ImportCategoryService';
import { ListCategoryService } from '../../application/category/ListCategoryService';
import { SQLCategoryRepository } from '../../infra/category/repositories/SQLCategoryRepository';
import { SQLSpecificationRepository } from '../../infra/specification/repositories/SQLSpecificationRepository';
import { SQLUserRepository } from '../../infra/user/repositories/SQLUserRepository';
import { SpecificationRepository } from '../../domain/SpecificationRepository';
import { UpdateUserAvatarService } from '../../application/user/UpdateUserAvatarService';
import { UserRepository } from '../../domain/user/UserRepository';
import { CarRepository } from '../../domain/CarRepository';
import { CreateCarService } from '../../application/car/CreateCarService';
import { ListCarService } from '../../application/car/ListCarService';
import { CreateCarSpecificationService } from '../../application/car/CreateCarSpecificationService';
import { UploadCarImagesService } from '../../application/car/UploadCarImagesService';
import { CreateRentalService } from '../../application/rental/CreateRentalService';
import { RentalRepository } from '../../domain/RentalRepository';
import { DateProvider } from '../../domain/DateProvider';
import { DayjsDateProvider } from '../../infra/providers/DayjsDateProvider';
import { SQLCarRepository } from '../../infra/car/repositories/SQLCarRepository';
import { SQLRentalRepository } from '../../infra/rental/repositories/SQLRentalRepository';
import { CarImageRepository } from '../../domain/CarImageRepository';
import { SQLCarImageRepository } from '../../infra/car/repositories/SQLCarImageRepository';
import { RefreshTokenService } from '../../application/refresh_token/RefreshTokenService';
import { UserTokensRepository } from '../../domain/user/UserTokensRepository';
import { SQLUserTokensRepository } from '../../infra/user/repositories/SQLUserTokensRepository';

type Container = {
  categoryRepository: CategoryRepository;
  specificationRepository: SpecificationRepository;
  userRepository: UserRepository;
  carRepository: CarRepository;
  rentalRepository: RentalRepository;
  carImageRepository: CarImageRepository;
  createCategoryService: CreateCategoryService;
  listCategoryService: ListCategoryService;
  importCategoryService: ImportCategoryService;
  createSpecificationService: CreateSpecificationService;
  createUserService: CreateUserService;
  authenticateUserService: AuthenticateUserService;
  updateUserAvatarService: UpdateUserAvatarService;
  createCarService: CreateCarService;
  listCarService: ListCarService;
  createCarSpecificationService: CreateCarSpecificationService;
  uploadCarImagesService: UploadCarImagesService;
  createRentalService: CreateRentalService;
  dateProvider: DateProvider;
  refreshTokenService: RefreshTokenService;
  userTokensRepository: UserTokensRepository;
};

const container = createContainer<Container>();

container.register({
  categoryRepository: asClass(SQLCategoryRepository).singleton(),
  specificationRepository: asClass(SQLSpecificationRepository).singleton(),
  userRepository: asClass(SQLUserRepository).singleton(),
  carRepository: asClass(SQLCarRepository).singleton(),
  rentalRepository: asClass(SQLRentalRepository).singleton(),
  carImageRepository: asClass(SQLCarImageRepository).singleton(),
  userTokensRepository: asClass(SQLUserTokensRepository).singleton(),
  createCategoryService: asClass(CreateCategoryService).singleton(),
  listCategoryService: asClass(ListCategoryService).singleton(),
  importCategoryService: asClass(ImportCategoryService).singleton(),
  createSpecificationService: asClass(CreateSpecificationService).singleton(),
  createUserService: asClass(CreateUserService).singleton(),
  authenticateUserService: asClass(AuthenticateUserService),
  updateUserAvatarService: asClass(UpdateUserAvatarService),
  createCarService: asClass(CreateCarService),
  listCarService: asClass(ListCarService),
  createCarSpecificationService: asClass(CreateCarSpecificationService),
  uploadCarImagesService: asClass(UploadCarImagesService),
  createRentalService: asClass(CreateRentalService),
  refreshTokenService: asClass(RefreshTokenService),
  dateProvider: asClass(DayjsDateProvider),
});

export default container;
