import { ApplicationService } from '@lib/ApplicationService';
import { StorageProvider } from '@lib/StorageProvider';
import { CarImageRepository } from '../domain/CarImageRepository';

interface Request {
  car_id: string;
  images_name: string[];
}

type Dependencies = {
  carImageRepository: CarImageRepository;
  storageProvider: StorageProvider;
};

export class UploadCarImagesService
  implements ApplicationService<Request, void>
{
  private carImageRepository: CarImageRepository;

  private storageProvider: StorageProvider;

  constructor({ carImageRepository, storageProvider }: Dependencies) {
    this.carImageRepository = carImageRepository;
    this.storageProvider = storageProvider;
  }

  async execute({ car_id, images_name }: Request): Promise<void> {
    images_name.map(async img => {
      await this.carImageRepository.store(car_id, img);
      await this.storageProvider.save(img, 'cars');
    });
  }
}
