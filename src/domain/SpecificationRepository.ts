import { Specification } from './Specification';

export interface SpecificationRepository {
  getNextId(): string;
  store(specification: Specification): void;
  findByName(name: string): Specification;
}
