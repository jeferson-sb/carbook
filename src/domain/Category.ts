interface CategoryData {
  id: string;
  name: string;
  description: string;
}

export class Category {
  private id: string;
  private name: string;
  private description: string;

  static from({ id, name, description }: CategoryData): Category {
    const instance = new Category();

    instance.id = id;
    instance.name = name;
    instance.description = description;

    return instance;
  }
}
