import { DoctorRepository } from '../doctor.repository';
import { DoctorEntity } from '../entities/doctor.entity';
import { Inject } from "@nestjs/common";

export class GetDoctorByUserID {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: DoctorRepository,
  ) {}

  async getDoctorByUserID(userID: string): Promise<DoctorEntity> {
    return await this.repository.getDoctorByUserID(userID);
  }
}
