import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../user.repository';
import { Inject } from '@nestjs/common';

export class CreateUser {
  constructor(
    @Inject('DATABASE_REPOSITORY') private readonly repository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = await UserEntity.create(createUserDto);
    return await this.repository.createUser(userEntity);
  }
}
