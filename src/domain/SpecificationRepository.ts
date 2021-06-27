import { Specification } from './Specification';

export interface SpecificationRepository {
  getNextId(): string;
  store(specification: Specification): Promise<void>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}
