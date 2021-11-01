import { UserEntity } from '../user.entity';
import { IUser } from '../interfaces/user.interface';
import { UserMapper } from '../mapper/user.mapper';
import { UserRepository } from '../user.repository';

export class GetUser {
  constructor(
    private readonly mapper: UserMapper,
    private readonly repository: UserRepository,
  ) {}

  async getUser(login: string) {

    const user: IUser = await UserEntity.copy();
  }
}
