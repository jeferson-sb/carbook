import { v4 as uuidv4 } from 'uuid';

import {
  CreateUserTokenDTO,
  UserTokensRepository,
} from '../../domain/UserTokensRepository';
import { UserTokens } from '../../domain/UserTokens';

export class MemUserTokensRepository implements UserTokensRepository {
  private userTokens: UserTokens[] = [];

  getNextId(): string {
    return uuidv4();
  }

  async store({
    id,
    expiresDate,
    refreshToken,
    userId,
  }: CreateUserTokenDTO): Promise<UserTokens> {
    const token = { id, expiresDate, refreshToken, userId };
    this.userTokens.push(token);

    return token;
  }

  async findByUserIdAndToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokens | null> {
    return (
      this.userTokens.find(
        userToken =>
          userToken.userId === userId &&
          userToken.refreshToken === refreshToken,
      ) || null
    );
  }

  async deleteById(id: string): Promise<void> {
    const index = this.userTokens.findIndex(userToken => userToken.id === id);

    this.userTokens.splice(index, 1);
  }

  async findByRefreshToken(refreshToken: string): Promise<UserTokens | null> {
    const userTokens = this.userTokens.find(
      user => user.refreshToken === refreshToken,
    );
    return userTokens || null;
  }
}
