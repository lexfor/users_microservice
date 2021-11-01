import { Inject, Injectable } from '@nestjs/common';
import { IDoctorRepository } from './interfaces/repository.interface';
import { SpecializationMapper } from './mapper/specialization.mapper';
import { SpecializationEntity } from './entities/specialization.entity';
import { DoctorEntity } from './entities/doctor.entity';
import { DoctorMapper } from './mapper/doctor.mapper';

@Injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly specializationMapper: SpecializationMapper,
    private readonly doctorMapper: DoctorMapper,
  ) {}

  async getDoctorByUserID(userID: string): Promise<DoctorEntity> {
    const sql = `SELECT doctors.*, specializations.name FROM doctors
                 JOIN doctor_specialization
                 ON doctor_specialization.doctor_id = doctors.id
                 INNER JOIN specializations
                 ON doctor_specialization.specialization_id = specializations.id
                 WHERE user_id = $1`;
    const { rows } = await this.pool.query(sql, [userID]);
    const [result] = rows;
    return this.doctorMapper.toEntity(result);
  }

  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    const sql = `SELECT * FROM specializations`;
    const { rows } = await this.pool.query(sql);
    return rows.map((specialization) => {
      return this.specializationMapper.toEntity(specialization);
    });
  }

  async getDoctorsBySpecialization(
    specializationID: string,
  ): Promise<DoctorEntity[]> {
    const sql = `SELECT doctors.*, specializations.name FROM doctors
                 JOIN doctor_specialization
                 ON doctor_specialization.doctor_id = doctors.id
                 INNER JOIN specializations
                 ON doctor_specialization.specialization_id = specializations.id
                 WHERE specializations.id = $1`;
    const { rows } = await this.pool.query(sql, [specializationID]);
    return rows.map((doctor) => {
      return this.doctorMapper.toEntity(doctor);
    });
  }
}
