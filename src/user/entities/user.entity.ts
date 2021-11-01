import { v1 as uuidv1 } from 'uuid';
import { hashSync, compareSync } from 'bcryptjs';
import { LoginUserDto } from '../dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { IUser } from '../interfaces/user.interface';

@Injectable()
export class UserEntity {
  private readonly id: string;
  private readonly login: string;
  private readonly password: string;

  constructor(
    login: string,
    password: string,
    private readonly config: ConfigService,
    id = uuidv1(),
  ) {
    this.id = id;
    this.login = login;
    this.password = password;
  }

  async create(userDto: LoginUserDto): Promise<UserEntity> {
    return new UserEntity(
      userDto.login,
      await hashSync(userDto.password, +this.config.get('SALT')),
      this.config,
    );
  }

  copy(user: IUser): UserEntity {
    return new UserEntity(user.login, user.password, this.config, user.id);
  }

  async checkPassword(password: string): Promise<boolean> {
    if (await compareSync(password, this.password)) {
      return true;
    }
    return false;
  }

  get getID(): string {
    return this.id;
  }

  get getLogin(): string {
    return this.login;
  }

  get getPassword(): string {
    return this.password;
  }
}
