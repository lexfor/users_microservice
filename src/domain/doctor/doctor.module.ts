import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { ConfigService } from '@nestjs/config';
import { poolFactory } from '../../infrastructure/configs/database.config';
import { DoctorRepository } from './doctor.repository';
import { DoctorEntity } from './entities/doctor.entity';
import { SpecializationEntity } from './entities/specialization.entity';
import { DoctorMapper } from './mapper/doctor.mapper';
import { SpecializationMapper } from './mapper/specialization.mapper';
import { GetAllSpecializations } from './actions/getAllSpecializations';
import { GetDoctorsBySpecializations } from './actions/getDoctorsBySpecializations';
import { GetDoctorByUserID } from './actions/getDoctorByUserID';

@Module({
  controllers: [DoctorController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    DoctorRepository,
    DoctorEntity,
    SpecializationEntity,
    DoctorMapper,
    SpecializationMapper,
    GetAllSpecializations,
    GetDoctorsBySpecializations,
  ],
  exports: [
    GetDoctorsBySpecializations,
    GetAllSpecializations,
    GetDoctorByUserID,
  ],
})
export class DoctorModule {}
