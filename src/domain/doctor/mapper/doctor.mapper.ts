import { DoctorEntity } from '../entities/doctor.entity';
import { IDoctor } from '../interfaces/doctor.interface';

export class DoctorMapper {
  toEntity(doctor: IDoctor): DoctorEntity {
    return new DoctorEntity(
      doctor.user_id,
      doctor.first_name,
      doctor.last_name,
      doctor.mail,
      doctor.id,
    );
  }

  toRow(doctorEntity: DoctorEntity): IDoctor {
    return {
      id: doctorEntity.getID,
      first_name: doctorEntity.getFirstName,
      last_name: doctorEntity.getLastName,
      mail: doctorEntity.getMail,
      user_id: doctorEntity.getUserID,
    };
  }
}
