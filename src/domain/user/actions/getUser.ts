import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../user.repository';
import { LoginUserDto } from '../dto/login-user.dto';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';

export class GetUser {
  constructor(
    @Inject('DATABASE_REPOSITORY') private readonly repository: UserRepository,
  ) {}

  async getUser(loginUserDto: LoginUserDto, role: string): Promise<UserEntity> {
    const userEntity: UserEntity = await this.repository.getUser(
      loginUserDto.login,
      role,
    );
    if (userEntity.getID !== null) {
      if (await userEntity.checkPassword(loginUserDto.password)) {
        return userEntity;
      } else {
        throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
      }
    } else {
      return userEntity;
    }
  }
}
