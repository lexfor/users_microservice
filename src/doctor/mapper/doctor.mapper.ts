import { DoctorEntity } from '../entities/doctor.entity';
import { IDoctor } from '../interfaces/doctor.interface';

export class DoctorMapper {
  constructor(private readonly entity: DoctorEntity) {}

  toEntity(doctor: IDoctor): DoctorEntity {
    return this.entity.copy(doctor);
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
