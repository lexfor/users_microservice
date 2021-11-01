import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';

export class GetPatientByID {
  constructor(private readonly repository: PatientRepository) {}

  async getPatientByID(patientID: string): Promise<PatientEntity> {
    return await this.repository.getPatientByID(patientID);
  }
}
