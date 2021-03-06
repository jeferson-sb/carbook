import fs from 'fs';
import csvParse from 'csv-parse';

import { ApplicationService } from '@lib/ApplicationService';

import { CategoryRepository } from '../domain/CategoryRepository';
import { Category } from '../domain/Category';

interface ImportCategory {
  name: string;
  description: string;
}

type Dependencies = {
  categoryRepository: CategoryRepository;
};

export class ImportCategoryService
  implements ApplicationService<Express.Multer.File, void>
{
  private categoryRepository: CategoryRepository;

  constructor({ categoryRepository }: Dependencies) {
    this.categoryRepository = categoryRepository;
  }

  loadCategories(file: Express.Multer.File): Promise<ImportCategory[]> {
    return new Promise((resolve, reject) => {
      const fileStream = fs.createReadStream(file.path);
      const categories: ImportCategory[] = [];
      const parseFile = csvParse();
      fileStream.pipe(parseFile);

      parseFile
        .on('data', async line => {
          const [name, description] = line;
          categories.push({
            name,
            description,
          });
        })
        .on('end', () => {
          fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', err => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file);
    categories.map(async category => {
      const { name, description } = category;
      const existingCategory = await this.categoryRepository.findByName(name);

      if (!existingCategory) {
        await this.categoryRepository.store(
          Category.from({
            id: this.categoryRepository.getNextId(),
            name,
            description,
          }),
        );
      }
    });
  }
}
