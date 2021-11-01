import { IUser } from '../interfaces/user.interface';
import { UserEntity } from '../entities/user.entity';
import { ConfigService } from '@nestjs/config';

export class UserMapper {
  constructor(private readonly config: ConfigService) {}

  toEntity(user: IUser): UserEntity {
    return new UserEntity(user.login, user.password, this.config, user.id);
  }

  toRow(userEntity: UserEntity): IUser {
    return {
      id: userEntity.getID,
      login: userEntity.getLogin,
      password: userEntity.getPassword,
    };
  }
}
