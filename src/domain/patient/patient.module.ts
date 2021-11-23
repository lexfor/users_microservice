import { CacheModule, Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { PatientRepository } from './patient.repository';
import { PatientMapper } from './mapper/patient.mapper';
import { GetAllPatients } from './actions/getAllPatients';
import { CreatePatient } from './actions/createPatient';
import { FindPatientByUserID } from './actions/findPatientByUserID';
import { GetPatientByID } from './actions/getPatientByID';
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
  controllers: [PatientController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    {
      provide: 'DATABASE_REPOSITORY',
      useClass: PatientRepository,
    },
    CreatePatient,
    FindPatientByUserID,
    PatientMapper,
    GetAllPatients,
    GetPatientByID,
  ],
  exports: [
    CreatePatient,
    FindPatientByUserID,
    GetAllPatients,
    GetPatientByID,
    PatientMapper,
  ],
})
export class PatientModule {}
