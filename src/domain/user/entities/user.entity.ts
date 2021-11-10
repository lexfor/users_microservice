import { v1 as uuidv1 } from 'uuid';
import { hashSync, compareSync } from 'bcryptjs';
import { LoginUserDto } from '../dto/login-user.dto';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class UserEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly login: string;
  @ApiProperty()
  private readonly password: string;

  constructor(login: string, password: string, id: string = uuidv1()) {
    this.login = login;
    this.password = password;
    this.id = id;
  }

  static async create(userDto: LoginUserDto): Promise<UserEntity> {
    const hashPassword = await hashSync(userDto.password, +process.env.SALT);
    return new UserEntity(userDto.login, hashPassword);
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
