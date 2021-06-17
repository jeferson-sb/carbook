import { Specification } from '../../domain/Specification';
import { SpecificationRepository } from '../../domain/SpecificationRepository';
import { ApplicationService } from '../../lib/ApplicationService';
import { SpecificationDTO } from './payload/SpecificationDTO';

type Dependencies = {
  specificationRepository: SpecificationRepository;
};

export class CreateSpecificationService
  implements ApplicationService<SpecificationDTO, void>
{
  private specificationRepository: SpecificationRepository;

  constructor({ specificationRepository }: Dependencies) {
    this.specificationRepository = specificationRepository;
  }

  async execute({ name, description }: SpecificationDTO): Promise<void> {
    const existingSpecification = await this.specificationRepository.findByName(
      name,
    );

    if (existingSpecification) {
      throw new Error('This specification already exists.');
    }

    const specification = new Specification({
      id: this.specificationRepository.getNextId(),
      name,
      description,
    });

    await this.specificationRepository.store(specification);
  }
}
