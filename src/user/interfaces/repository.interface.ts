import { IUser } from './user.interface';

export interface IAuthRepository {
  createUser: (user: IUser) => Promise<IUser>;
  getUser: (login: string, role: string) => Promise<IUser>;
}
