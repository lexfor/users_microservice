import { IPatient } from '../interfaces/patient.interface';
import { PatientEntity } from '../entities/patient.entity';

export class PatientMapper {
  toEntity(patient: IPatient): PatientEntity {
    return new PatientEntity(
      patient.user_id,
      patient.name,
      patient.birthday,
      patient.gender,
      patient.mail,
      patient.id,
    );
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
