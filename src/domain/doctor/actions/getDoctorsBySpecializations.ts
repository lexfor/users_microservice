import { DoctorRepository } from '../doctor.repository';
import { DoctorEntity } from '../entities/doctor.entity';

export class GetDoctorsBySpecializations {
  constructor(private readonly repository: DoctorRepository) {}

  async getDoctorsBySpecializations(
    specializationID: string,
  ): Promise<DoctorEntity[]> {
    return await this.repository.getDoctorsBySpecialization(specializationID);
  }
}
