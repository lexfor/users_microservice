import { DoctorRepository } from '../doctor.repository';
import { DoctorEntity } from '../entities/doctor.entity';

export class GetDoctorByUserID {
  constructor(private readonly repository: DoctorRepository) {}

  async getDoctorByUserID(userID: string): Promise<DoctorEntity> {
    return await this.repository.getDoctorByUserID(userID);
  }
}
