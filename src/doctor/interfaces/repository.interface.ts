import { IDoctor } from './doctor.interface';
import { ISpecialization } from './specialization.interface';

export interface IDoctorRepository {
  getDoctorByUserID: (userID: string) => Promise<IDoctor>;
  getAllSpecializations: () => Promise<ISpecialization[]>;
  getDoctorsBySpecialization: (specializationID: string) => Promise<IDoctor[]>;
}
