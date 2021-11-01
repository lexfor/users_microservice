import { DoctorMapper } from '../mapper/doctor.mapper';
import { DoctorRepository } from '../doctor.repository';
import { DoctorEntity } from '../entities/doctor.entity';
import { IDoctor } from '../interfaces/doctor.interface';

export class GetDoctorByUserID {
  constructor(
    private readonly mapper: DoctorMapper,
    private readonly repository: DoctorRepository,
  ) {}

  async getDoctorByUserID(userID: string): Promise<DoctorEntity> {
    const userRows: IDoctor = await this.repository.getDoctorByUserID(userID);
    return this.mapper.toEntity(userRows);
  }
}
