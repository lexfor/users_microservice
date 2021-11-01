import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserMapper } from '../mapper/user.mapper';
import { UserRepository } from '../user.repository';
import { IUser } from '../interfaces/user.interface';

export class CreateUser {
  constructor(
    private readonly mapper: UserMapper,
    private readonly repository: UserRepository,
    private readonly entity: UserEntity,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userEntity: UserEntity = await this.entity.create(createUserDto);
    const userRow: IUser = this.mapper.toRow(userEntity);
    await this.repository.createUser(userRow);
    return userEntity;
  }
}
