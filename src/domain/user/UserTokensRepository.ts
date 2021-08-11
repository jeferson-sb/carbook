import { UserTokensEntity } from '../../infra/user/typeorm/UserTokensEntity';

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
  }: CreateUserTokenDTO): Promise<UserTokensEntity>;
  findByUserIdAndToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserTokensEntity>;
  deleteById(id: string): Promise<void>;
}
