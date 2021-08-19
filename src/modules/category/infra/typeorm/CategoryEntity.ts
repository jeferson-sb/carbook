import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('categories')
export class CategoryEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
