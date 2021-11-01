import { IUser } from '../interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  constructor(private readonly entity: UserEntity) {}

  toEntity(user: IUser): UserEntity {
    return this.entity.copy(user);
  }

  toRow(userEntity: UserEntity): IUser {
    return {
      id: userEntity.getID,
      login: userEntity.getLogin,
      password: userEntity.getPassword,
    };
  }
}
