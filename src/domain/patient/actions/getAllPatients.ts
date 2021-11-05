import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { Inject } from '@nestjs/common';

export class GetAllPatients {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: PatientRepository,
  ) {}

  async getAllPatients(patientInfo: string): Promise<PatientEntity[]> {
    return await this.repository.getAllPatients(patientInfo);
  }
}
