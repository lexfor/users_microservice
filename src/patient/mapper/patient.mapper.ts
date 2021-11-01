import { IPatient } from '../interfaces/patient.interface';
import { PatientEntity } from '../entities/patient.entity';

export class PatientMapper {
  constructor(private readonly entity: PatientEntity) {}

  toEntity(patient: IPatient): PatientEntity {
    return this.entity.copy(patient);
  }

  toRow(patientEntity: PatientEntity): IPatient {
    return {
      id: patientEntity.getID,
      name: patientEntity.getName,
      birthday: patientEntity.getBirthday,
      mail: patientEntity.getMail,
      gender: patientEntity.getGender,
      user_id: patientEntity.getUserID,
    };
  }
}
