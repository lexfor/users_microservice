import { DoctorRepository } from '../doctor.repository';
import { SpecializationEntity } from '../entities/specialization.entity';

export class GetAllSpecializations {
  constructor(private readonly repository: DoctorRepository) {}

  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return await this.repository.getAllSpecializations();
  }
}
