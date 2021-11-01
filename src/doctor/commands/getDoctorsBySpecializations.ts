import { DoctorMapper } from '../mapper/doctor.mapper';
import { DoctorRepository } from '../doctor.repository';
import { DoctorEntity } from '../entities/doctor.entity';
import { IDoctor } from '../interfaces/doctor.interface';

export class GetDoctorsBySpecializations {
  constructor(
    private readonly mapper: DoctorMapper,
    private readonly repository: DoctorRepository,
  ) {}

  async getDoctorsBySpecializations(
    specializationID: string,
  ): Promise<DoctorEntity[]> {
    const userRows: IDoctor[] =
      await this.repository.getDoctorsBySpecialization(specializationID);
    return userRows.map((doctor) => {
      return this.mapper.toEntity(doctor);
    });
  }
}
