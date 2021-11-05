import { Module } from '@nestjs/common';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserMapper } from './mapper/user.mapper';
import { CreateUser } from './actions/createUser';
import { GetUser } from './actions/getUser';
import { DoctorRepository } from '../doctor/doctor.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'DATABASE_REPOSITORY',
      useClass: UserRepository,
    },
    CreateUser,
    GetUser,
    UserMapper,
  ],
  exports: [CreateUser, GetUser, UserMapper],
})
export class UserModule {}
