import { IPatient } from './patient.interface';

export interface IPatientRepository {
  createPatient: (patient: IPatient) => Promise<IPatient>;
  findPatientByUserID: (userID: string) => Promise<IPatient>;
  getAllPatients: (patientInfo: string) => Promise<IPatient[]>;
  getPatientByID: (patientID: string) => Promise<IPatient>;
}
