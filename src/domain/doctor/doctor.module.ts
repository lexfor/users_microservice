import { CacheModule, Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { DoctorRepository } from './doctor.repository';
import { DoctorMapper } from './mapper/doctor.mapper';
import { SpecializationMapper } from './mapper/specialization.mapper';
import { GetAllSpecializations } from './actions/getAllSpecializations';
import { GetDoctorsBySpecializations } from './actions/getDoctorsBySpecializations';
import { GetDoctorByUserID } from './actions/getDoctorByUserID';
import config from '../../infrastructure/config';
import { CustomLogger } from '../../infrastructure/logger/CustomLogger';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
    }),
    CacheModule.register(),
    CustomLogger,
  ],
  controllers: [DoctorController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'DATABASE_REPOSITORY',
      useClass: DoctorRepository,
    },
    DoctorMapper,
    SpecializationMapper,
    GetAllSpecializations,
    GetDoctorsBySpecializations,
    GetDoctorByUserID,
  ],
  exports: [
    GetDoctorsBySpecializations,
    GetAllSpecializations,
    GetDoctorByUserID,
    DoctorMapper,
  ],
})
export class DoctorModule {}
