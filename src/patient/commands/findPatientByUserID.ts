import { PatientMapper } from '../mapper/patient.mapper';
import { PatientRepository } from '../patient.repository';
import { IPatient } from '../interfaces/patient.interface';
import { PatientEntity } from '../entities/patient.entity';

export class FindPatientByUserID {
  constructor(
    private readonly mapper: PatientMapper,
    private readonly repository: PatientRepository,
  ) {}

  async findPatientByUserID(userID: string): Promise<PatientEntity> {
    const userRow: IPatient = await this.repository.findPatientByUserID(userID);
    return this.mapper.toEntity(userRow);
  }
}
