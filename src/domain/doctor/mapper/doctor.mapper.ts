import { DoctorEntity } from '../entities/doctor.entity';
import { IDoctor } from '../interfaces/doctor.interface';

export class DoctorMapper {
  toEntity(doctor: IDoctor): DoctorEntity {
    return new DoctorEntity(
      doctor.user_id,
      doctor.name,
      doctor.specialization,
      doctor.mail,
      doctor.id,
    );
  }

  toRow(doctorEntity: DoctorEntity): IDoctor {
    return {
      id: doctorEntity.getID,
      name: doctorEntity.getName,
      specialization: doctorEntity.getSpecialization,
      mail: doctorEntity.getMail,
      user_id: doctorEntity.getUserID,
    };
  }
}
