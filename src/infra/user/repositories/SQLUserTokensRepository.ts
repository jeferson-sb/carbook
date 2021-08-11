import { Repository, getRepository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import {
  CreateUserTokenDTO,
  UserTokensRepository,
} from '../../../domain/user/UserTokensRepository';
import { UserTokensEntity } from '../typeorm/UserTokensEntity';

export class SQLUserTokensRepository implements UserTokensRepository {
  private repository: Repository<UserTokensEntity>;

  constructor() {
    this.repository = getRepository(UserTokensEntity);
  }

  getNextId(): string {
    return uuidv4();
  }

  async store({
    id,
    expiresDate,
    refreshToken,
    userId,
  }: CreateUserTokenDTO): Promise<UserTokensEntity> {
    const userToken = await this.repository.create({
      id,
      expires_date: expiresDate,
      refresh_token: refreshToken,
      user_id: userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokensEntity> {
    const usersTokens = await this.repository.findOne({
      user_id: userId,
      refresh_token: refreshToken,
    });

    return usersTokens;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
