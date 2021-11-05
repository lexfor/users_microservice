import { DoctorRepository } from '../doctor.repository';
import { DoctorEntity } from '../entities/doctor.entity';
import { Inject } from '@nestjs/common';

export class GetDoctorsBySpecializations {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: DoctorRepository,
  ) {}

  async getDoctorsBySpecializations(
    specializationID: string,
  ): Promise<DoctorEntity[]> {
    return await this.repository.getDoctorsBySpecialization(specializationID);
  }
}
