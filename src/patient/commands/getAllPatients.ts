import { PatientMapper } from '../mapper/patient.mapper';
import { PatientRepository } from '../patient.repository';
import { IPatient } from '../interfaces/patient.interface';
import { PatientEntity } from '../entities/patient.entity';

export class GetAllPatients {
  constructor(
    private readonly mapper: PatientMapper,
    private readonly repository: PatientRepository,
  ) {}

  async getAllPatients(patientInfo: string): Promise<PatientEntity[]> {
    const userRows: IPatient[] = await this.repository.getAllPatients(
      patientInfo,
    );
    return userRows.map((row) => {
      return this.mapper.toEntity(row);
    });
  }
}
