import { DoctorRepository } from '../doctor.repository';
import { SpecializationEntity } from '../entities/specialization.entity';
import { Inject } from '@nestjs/common';

export class GetAllSpecializations {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: DoctorRepository,
  ) {}

  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return await this.repository.getAllSpecializations();
  }
}
