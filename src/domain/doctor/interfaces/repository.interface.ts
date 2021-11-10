import { SpecializationEntity } from '../entities/specialization.entity';
import { DoctorEntity } from '../entities/doctor.entity';

export interface IDoctorRepository {
  getDoctorByUserID: (userID: string) => Promise<DoctorEntity>;
  getAllSpecializations: () => Promise<SpecializationEntity[]>;
  getDoctorsBySpecialization: (
    specializationID: string,
  ) => Promise<DoctorEntity[]>;
}
