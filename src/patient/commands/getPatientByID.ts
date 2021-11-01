import { PatientMapper } from '../mapper/patient.mapper';
import { PatientRepository } from '../patient.repository';
import { IPatient } from '../interfaces/patient.interface';
import { PatientEntity } from '../entities/patient.entity';

export class GetPatientByID {
  constructor(
    private readonly mapper: PatientMapper,
    private readonly repository: PatientRepository,
  ) {}

  async getPatientByID(patientID: string): Promise<PatientEntity> {
    const userRows: IPatient = await this.repository.getPatientByID(patientID);
    return this.mapper.toEntity(userRows);
  }
}
