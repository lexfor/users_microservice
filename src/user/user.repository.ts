import { Inject, Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { roles } from '../infrastructure/constants';
import { IUserRepository } from './interfaces/repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(@Inject('DATABASE_POOL') private pool) {}
  async createUser(user: IUser): Promise<IUser> {
    const sql = `INSERT INTO users (id, login, password) SET VALUES
                 ($1, $2, $3);`;
    await this.pool.query(sql, [user.id, user.login, user.password]);
    return user;
  }

  async getUser(login: string, role: string): Promise<IUser> {
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
    const { rows } = await this.pool.query(sql, [login]);
    const [result] = rows;
    return result;
  }
}
