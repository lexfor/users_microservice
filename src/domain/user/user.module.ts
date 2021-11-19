import { CacheModule, Module } from '@nestjs/common';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserMapper } from './mapper/user.mapper';
import { CreateUser } from './actions/createUser';
import { GetUser } from './actions/getUser';
import { UserRepository } from './user.repository';
import config from '../../infrastructure/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    CacheModule.register(),
  ],
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
