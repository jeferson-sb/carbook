import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CarEntity } from '@modules/car/infra/typeorm/CarEntity';

@Entity('rentals')
export class RentalEntity {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => CarEntity)
  @JoinColumn({ name: 'car_id' })
  car: CarEntity;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;
}
