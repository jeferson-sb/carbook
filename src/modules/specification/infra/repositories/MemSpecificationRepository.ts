import { v4 as uuidv4 } from 'uuid';

import { Specification } from '../../domain/Specification';
import { SpecificationRepository } from '../../domain/SpecificationRepository';

export class MemSpecificationRepository implements SpecificationRepository {
  private specification: Specification[] = [];

  getNextId(): string {
    return uuidv4();
  }

  async store(specification: Specification): Promise<void> {
    this.specification.push(specification);
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = this.specification.find(s => s.name === name);
    return specification || null;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specification.filter(spec =>
      ids.includes(spec.id),
    );

    return allSpecifications;
  }
}
