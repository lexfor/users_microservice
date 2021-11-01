import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { ConfigService } from '@nestjs/config';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { PatientRepository } from './patient.repository';
import { PatientEntity } from './entities/patient.entity';
import { PatientMapper } from './mapper/patient.mapper';
import { GetAllPatients } from './actions/getAllPatients';
import { CreatePatient } from './actions/createPatient';
import { FindPatientByUserID } from './actions/findPatientByUserID';
import { GetPatientByID } from './actions/getPatientByID';

@Module({
  controllers: [PatientController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    PatientRepository,
    PatientEntity,
    PatientMapper,
    GetAllPatients,
  ],
  exports: [CreatePatient, FindPatientByUserID, GetAllPatients, GetPatientByID],
})
export class PatientModule {}
