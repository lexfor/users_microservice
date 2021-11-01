import { PatientEntity } from '../entities/patient.entity';

export interface IPatientRepository {
  createPatient: (patient: PatientEntity) => Promise<PatientEntity>;
  findPatientByUserID: (userID: string) => Promise<PatientEntity>;
  getAllPatients: (patientInfo: string) => Promise<PatientEntity[]>;
  getPatientByID: (patientID: string) => Promise<PatientEntity>;
}
