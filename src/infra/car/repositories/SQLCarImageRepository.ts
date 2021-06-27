import { getRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { CarImageRepository } from '../../../domain/CarImageRepository';
import { CarImageEntity } from '../typeorm/CarImageEntity';

export class SQLCarImageRepository implements CarImageRepository {
  private repository: Repository<CarImageEntity>;

  constructor() {
    this.repository = getRepository(CarImageEntity);
  }

  getNextId(): string {
    return uuidv4();
  }

  async store(car_id: string, image_name: string): Promise<CarImageEntity> {
    const carImage = this.repository.create({ car_id, image_name });

    await this.repository.save(carImage);

    return carImage;
  }
}
