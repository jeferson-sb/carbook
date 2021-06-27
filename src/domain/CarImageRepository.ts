import { CarImageEntity } from '../infra/car/typeorm/CarImageEntity';

export interface CarImageRepository {
  getNextId(): string;
  store(car_id: string, image_name: string): Promise<CarImageEntity>;
}
