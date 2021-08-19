import { User } from './User';

export interface UserTokensProps {
  id: string;
  userId: string;
  refreshToken: string;
  expiresDate: Date;
}

export class UserTokens {
  id: string;

  userId: string;

  refreshToken: string;

  expiresDate: Date;

  constructor({ id, userId, refreshToken, expiresDate }: UserTokensProps) {
    this.id = id;
    this.userId = userId;
    this.refreshToken = refreshToken;
    this.expiresDate = expiresDate;
  }
}
