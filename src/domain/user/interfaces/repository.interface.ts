import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser: (user: UserEntity) => Promise<UserEntity>;
  getUser: (login: string, role: string) => Promise<UserEntity>;
}
