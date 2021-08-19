import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('cars_image')
export class CarImageEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;
}
