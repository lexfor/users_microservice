import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';

export class FindPatientByUserID {
  constructor(private readonly repository: PatientRepository) {}

  async findPatientByUserID(userID: string): Promise<PatientEntity> {
    return await this.repository.findPatientByUserID(userID);
  }
}
