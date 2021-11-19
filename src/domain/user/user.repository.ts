import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { roles } from '../../infrastructure/constants';
import { IUserRepository } from './interfaces/repository.interface';
import { UserMapper } from './mapper/user.mapper';
import { UserEntity } from './entities/user.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: UserMapper,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createUser(userEntity: UserEntity): Promise<UserEntity> {
    const user: IUser = this.mapper.toRow(userEntity);
    const sql = `INSERT INTO users (id, login, password) VALUES
                 ($1, $2, $3);`;
    await this.pool.query(sql, [user.id, user.login, user.password]);
    return userEntity;
  }

  async getUser(login: string, role: string): Promise<UserEntity> {
    let value: IUser = await this.cacheManager.get(`user/${login}`);

    let join = '';
    if (role === roles.doctor) {
      join = `
        JOIN doctors ON 
        doctors.user_id = users.id`;
    }
    const sql = `SELECT users.* FROM users
        ${join}
        WHERE 
        login = $1`;

    if (!value) {
      const { rows } = await this.pool.query(sql, [login]);
      const [result] = rows;
      await this.cacheManager.set(`user/${login}`, result, {
        ttl: 3600,
      });
      value = result;
    }

    if (!value) {
      return this.mapper.toEntity({
        id: null,
        login: null,
        password: null,
      });
    }
    return this.mapper.toEntity(value);
  }
}
