import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { Inject } from '@nestjs/common';

export class CreatePatient {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: PatientRepository,
  ) {}

  async createPatient(
    createPatientDto: CreatePatientDto,
  ): Promise<PatientEntity> {
    const patientEntity: PatientEntity = await PatientEntity.create(
      createPatientDto,
    );
    await this.repository.createPatient(patientEntity);
    return patientEntity;
  }
}
