import { DoctorRepository } from '../doctor.repository';
import { SpecializationEntity } from '../entities/specialization.entity';
import { ISpecialization } from '../interfaces/specialization.interface';
import { SpecializationMapper } from '../mapper/specialization.mapper';

export class GetAllSpecializations {
  constructor(
    private readonly mapper: SpecializationMapper,
    private readonly repository: DoctorRepository,
  ) {}

  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    const specializationsRows: ISpecialization[] =
      await this.repository.getAllSpecializations();
    return specializationsRows.map((specialization) => {
      return this.mapper.toEntity(specialization);
    });
  }
}
