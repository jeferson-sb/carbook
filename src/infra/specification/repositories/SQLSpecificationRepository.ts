import { Repository, getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { SpecificationEntity } from '../typeorm/SpecificationEntity';
import { SpecificationRepository } from '../../../domain/SpecificationRepository';
import { SpecificationDTO } from '../../../application/specification/payload/SpecificationDTO';

export class SQLSpecificationRepository implements SpecificationRepository {
  private repository: Repository<SpecificationEntity>;

  constructor() {
    this.repository = getRepository(SpecificationEntity);
  }

  getNextId(): string {
    return uuidv4();
  }

  async store(specificationData: SpecificationDTO): Promise<void> {
    const specification = await this.repository.create(specificationData);
    await this.repository.save(specification);
  }

  async findByName(name: string): Promise<SpecificationEntity> {
    const specification = await this.repository.findOne({ name });
    return specification;
  }
}
