import { IUser } from '../interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  toEntity(user: IUser): UserEntity {
    return new UserEntity(user.login, user.password, user.id);
  }

  toRow(userEntity: UserEntity): IUser {
    return {
      id: userEntity.getID,
      login: userEntity.getLogin,
      password: userEntity.getPassword,
    };
  }
}
