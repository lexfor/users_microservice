import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { poolFactory } from '../infrastructure/configs/database.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { UserMapper } from './mapper/user.mapper';
import { CreateUser } from './commands/createUser';
import { GetUser } from './commands/getUser';
import { PatientModule } from '../patient/patient.module';

@Module({
  imports: [ConfigModule, PatientModule],
  controllers: [UserController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    UserRepository,
    UserEntity,
    UserMapper,
    CreateUser,
    GetUser,
  ],
  exports: [CreateUser, GetUser],
})
export class UserModule {}
