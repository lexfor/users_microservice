import { IUser } from './user.interface';

export interface IUserRepository {
  createUser: (user: IUser) => Promise<IUser>;
  getUser: (login: string, role: string) => Promise<IUser>;
}
