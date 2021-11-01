import { UserEntity } from '../entities/user.entity';
import { IUser } from '../interfaces/user.interface';
import { UserMapper } from '../mapper/user.mapper';
import { UserRepository } from '../user.repository';
import { LoginUserDto } from '../dto/login-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export class GetUser {
  constructor(
    private readonly mapper: UserMapper,
    private readonly repository: UserRepository,
  ) {}

  async getUser(loginUserDto: LoginUserDto, role: string): Promise<UserEntity> {
    const userRow: IUser = await this.repository.getUser(
      loginUserDto.login,
      role,
    );
    const userEntity: UserEntity = this.mapper.toEntity(userRow);
    if (await userEntity.checkPassword(loginUserDto.password)) {
      return userEntity;
    } else {
      throw new HttpException('wrong password', HttpStatus.UNAUTHORIZED);
    }
  }
}
