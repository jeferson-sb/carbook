import { Specification } from '../../domain/Specification';
import { SpecificationRepository } from '../../domain/SpecificationRepository';
import { ApplicationService } from '../../lib/ApplicationService';

interface SpecificationDTO {
  name: string;
  description: string;
}

export class CreateSpecificationService
  implements ApplicationService<SpecificationDTO, void>
{
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
