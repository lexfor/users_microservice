import { Inject, Injectable } from '@nestjs/common';
import { IDoctorRepository } from './interfaces/repository.interface';
import { IDoctor } from './interfaces/doctor.interface';
import { ISpecialization } from './interfaces/specialization.interface';

@Injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(@Inject('DATABASE_POOL') private pool) {}

  async getDoctorByUserID(userID: string): Promise<IDoctor> {
    const sql = `SELECT doctors.*, specializations.name FROM doctors
                 JOIN doctor_specialization
                 ON doctor_specialization.doctor_id = doctors.id
                 INNER JOIN specializations
                 ON doctor_specialization.specialization_id = specializations.id
                 WHERE user_id = $1`;
    const { rows } = await this.pool.query(sql, [userID]);
    const [result] = rows;
    return result;
  }

  async getAllSpecializations(): Promise<ISpecialization[]> {
    const sql = `SELECT * FROM specializations`;
    const { rows } = await this.pool.query(sql);
    return rows;
  }

  async getDoctorsBySpecialization(
    specializationID: string,
  ): Promise<IDoctor[]> {
    const sql = `SELECT doctors.*, specializations.name FROM doctors
                 JOIN doctor_specialization
                 ON doctor_specialization.doctor_id = doctors.id
                 INNER JOIN specializations
                 ON doctor_specialization.specialization_id = specializations.id
                 WHERE specializations.id = $1`;
    const { rows } = await this.pool.query(sql, [specializationID]);
    return rows;
  }
}
