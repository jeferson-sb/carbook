interface SpecificationData {
  id: string;
  name: string;
  description: string;
}

export class Specification {
  private id: string;

  private name: string;

  private description: string;

  constructor({ id, name, description }: SpecificationData) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  snapshot(): SpecificationData {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
    };
  }
}
