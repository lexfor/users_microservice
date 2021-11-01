import { PatientRepository } from '../patient.repository';
import { PatientEntity } from '../entities/patient.entity';
import { CreatePatientDto } from '../dto/create-patient.dto';

export class CreatePatient {
  constructor(
    private readonly repository: PatientRepository,
    private readonly entity: PatientEntity,
  ) {}

  async createPatient(
    createPatientDto: CreatePatientDto,
  ): Promise<PatientEntity> {
    const patientEntity: PatientEntity = await this.entity.create(
      createPatientDto,
    );
    await this.repository.createPatient(patientEntity);
    return patientEntity;
  }
}
