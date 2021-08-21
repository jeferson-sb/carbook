import { UserTokens } from './UserTokens';

export interface CreateUserTokenDTO {
  id: string;
  userId: string;
  expiresDate: Date;
  refreshToken: string;
}

export interface UserTokensRepository {
  getNextId(): string;
  store({
    id,
    expiresDate,
    refreshToken,
    userId,
  }: CreateUserTokenDTO): Promise<UserTokens>;
  findByUserIdAndToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokens | null>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refreshToken: string): Promise<UserTokens | null>;
}
