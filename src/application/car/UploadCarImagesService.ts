import { CarImageRepository } from '../../domain/CarImageRepository';
import { ApplicationService } from '../../lib/ApplicationService';

interface Request {
  car_id: string;
  images_name: string[];
}

type Dependencies = {
  carImageRepository: CarImageRepository;
};

export class UploadCarImagesService
  implements ApplicationService<Request, void>
{
  private carImageRepository: CarImageRepository;

  constructor({ carImageRepository }: Dependencies) {
    this.carImageRepository = carImageRepository;
  }

  async execute({ car_id, images_name }: Request): Promise<void> {
    images_name.map(async (img) => {
      await this.carImageRepository.store(car_id, img);
    });
  }
}
