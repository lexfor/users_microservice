import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { Inject } from '@nestjs/common';

export class FindPatientByUserID {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: PatientRepository,
  ) {}

  async findPatientByUserID(userID: string): Promise<PatientEntity> {
    return await this.repository.findPatientByUserID(userID);
  }
}
