import { v4 as uuidv4 } from 'uuid';

import {
  CreateUserTokenDTO,
  UserTokensRepository,
} from '../../../domain/user/UserTokensRepository';

export class MemUserTokensRepository implements UserTokensRepository {
  private userTokens = [];

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

  findByUserIdAndToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokens> {
    this.userTokens.find(
      userToken =>
        userToken.userId === userId && userToken.refreshToken === refreshToken,
    );
  }

  deleteById(id: string): Promise<void> {
    const index = this.userTokens.findIndex(userToken => userToken.id === id);

    this.userTokens[index].splice(0, 1);
  }
}
