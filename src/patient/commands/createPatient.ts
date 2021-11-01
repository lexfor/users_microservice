import { PatientMapper } from '../mapper/patient.mapper';
import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { IPatient } from '../interfaces/patient.interface';

export class CreatePatient {
  constructor(
    private readonly mapper: PatientMapper,
    private readonly repository: PatientRepository,
    private readonly entity: PatientEntity,
  ) {}

  async createPatient(
    createPatientDto: CreatePatientDto,
  ): Promise<PatientEntity> {
    const patientEntity: PatientEntity = await this.entity.create(
      createPatientDto,
    );
    const userRow: IPatient = this.mapper.toRow(patientEntity);
    await this.repository.createPatient(userRow);
    return patientEntity;
  }
}
