import { Specification } from '../../domain/Specification';
import { SpecificationRepository } from '../../domain/SpecificationRepository';

interface SpecificationDTO {
  name: string;
  description: string;
}

export class CreateSpecificationService {
  constructor(private specificationRepository: SpecificationRepository) {}

  execute({ name, description }: SpecificationDTO): void {
    const existingSpecification = this.specificationRepository.findByName(name);

    if (existingSpecification) {
      throw new Error('This specification already exists.');
    }

    const specification = new Specification({
      id: this.specificationRepository.getNextId(),
      name,
      description,
    });

    this.specificationRepository.store(specification);
  }
}
