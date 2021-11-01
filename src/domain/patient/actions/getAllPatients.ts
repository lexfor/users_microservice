import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';

export class GetAllPatients {
  constructor(private readonly repository: PatientRepository) {}

  async getAllPatients(patientInfo: string): Promise<PatientEntity[]> {
    return await this.repository.getAllPatients(patientInfo);
  }
}
