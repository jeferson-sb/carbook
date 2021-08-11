import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { UserEntity } from './UserEntity';

@Entity('users_tokens')
export class UserTokensEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column()
  refresh_token: string;

  @Column()
  expires_date: Date;

  @CreateDateColumn()
  created_at: Date;
}
