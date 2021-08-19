import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { CategoryEntity } from '@modules/category/infra/typeorm/CategoryEntity';
import { SpecificationEntity } from '@modules/specification/infra/typeorm/SpecificationEntity';

@Entity('cars')
export class CarEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category_id: string;

  @ManyToMany(() => SpecificationEntity)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specification_id' }],
  })
  specifications: SpecificationEntity[];

  @CreateDateColumn()
  created_at: Date;
}
