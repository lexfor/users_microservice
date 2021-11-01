import { Inject, Injectable } from '@nestjs/common';
import { IPatientRepository } from './interfaces/repository.interface';
import { IPatient } from './interfaces/patient.interface';

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(@Inject('DATABASE_POOL') private pool) {}

  async createPatient(patient: IPatient): Promise<IPatient> {
    const sql = `INSERT INTO patients 
                 (id, name, birthday, gender, mail, user_id) SET VALUES
                 ($1, $2, $3, $4, $5, $6);`;
    await this.pool.query(sql, [
      patient.id,
      patient.name,
      patient.birthday,
      patient.gender,
      patient.mail,
      patient.user_id,
    ]);
    return patient;
  }

  async findPatientByUserID(userID: string): Promise<IPatient> {
    const sql = `SELECT * FROM patients WHERE user_id = $1`;
    const { rows } = await this.pool.query(sql, [userID]);
    const [result] = rows;
    return result;
  }

  async getAllPatients(patientInfo: string): Promise<IPatient[]> {
    const sql = `SELECT * FROM patients
                 WHERE name LIKE '%${patientInfo}%'
                 OR mail LIKE '%${patientInfo}%'`;
    const { rows } = await this.pool.query(sql);
    return rows;
  }

  async getPatientByID(patientID: string): Promise<IPatient> {
    const sql = `SELECT * FROM patients
                 WHERE id = $1`;
    const { rows } = await this.pool.query(sql, [patientID]);
    const [result] = rows;
    return result;
  }
}
