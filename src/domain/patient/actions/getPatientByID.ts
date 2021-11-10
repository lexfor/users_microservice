import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { Inject } from '@nestjs/common';

export class GetPatientByID {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: PatientRepository,
  ) {}

  async getPatientByID(patientID: string): Promise<PatientEntity> {
    return await this.repository.getPatientByID(patientID);
  }
}
