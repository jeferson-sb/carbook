import { v4 as uuidv4 } from 'uuid';

import { Specification } from '../../domain/Specification';
import { SpecificationRepository } from '../../domain/SpecificationRepository';

export class MemSpecificationRepository implements SpecificationRepository {
  private specification: Specification[] = [];

  getNextId(): string {
    return uuidv4();
  }

  store(specification: Specification): void {
    this.specification.push(specification);
  }

  findByName(name: string): Specification {
    const specification = this.specification.find((s) => s.name === name);
    return specification;
  }
}
