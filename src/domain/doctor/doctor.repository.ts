import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IDoctorRepository } from './interfaces/repository.interface';
import { SpecializationMapper } from './mapper/specialization.mapper';
import { SpecializationEntity } from './entities/specialization.entity';
import { DoctorEntity } from './entities/doctor.entity';
import { DoctorMapper } from './mapper/doctor.mapper';
import { Cache } from 'cache-manager';
import { ISpecialization } from './interfaces/specialization.interface';
import { IDoctor } from './interfaces/doctor.interface';

@Injectable()
export class DoctorRepository implements IDoctorRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly specializationMapper: SpecializationMapper,
    private readonly doctorMapper: DoctorMapper,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getDoctorByUserID(userID: string): Promise<DoctorEntity> {
    let value: IDoctor = await this.cacheManager.get(`doctor/${userID}`);

    const sql = `SELECT doctors.*, specializations.name as specialization FROM doctors
                 JOIN doctor_specialization
                 ON doctor_specialization.doctor_id = doctors.id
                 INNER JOIN specializations
                 ON doctor_specialization.specialization_id = specializations.id
                 WHERE user_id = $1`;
    if (!value) {
      const { rows } = await this.pool.query(sql, [userID]);
      const [result] = rows;
      await this.cacheManager.set(`doctor/${userID}`, result, {
        ttl: 3600,
      });
      value = result;
    }
    if (!value) {
      return this.doctorMapper.toEntity({
        id: null,
        name: null,
        mail: null,
        specialization: null,
        user_id: null,
      });
    }
    return this.doctorMapper.toEntity(value);
  }

  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    let value: ISpecialization[] = await this.cacheManager.get(
      'all/specializations',
    );
    if (!value) {
      const sql = `SELECT * FROM specializations`;
      const { rows } = await this.pool.query(sql);
      await this.cacheManager.set('all/specializations', rows, {
        ttl: 0,
      });
      value = rows;
    }
    return value.map((specialization) => {
      if (!specialization) {
        return this.specializationMapper.toEntity({
          id: null,
          name: null,
        });
      }
      return this.specializationMapper.toEntity(specialization);
    });
  }

  async getDoctorsBySpecialization(
    specializationID: string,
  ): Promise<DoctorEntity[]> {
    let value: IDoctor[] = await this.cacheManager.get(
      `doctor/specialization/${specializationID}`,
    );
    const sql = `SELECT doctors.*, specializations.name as specialization FROM doctors
                 JOIN doctor_specialization
                 ON doctor_specialization.doctor_id = doctors.id
                 INNER JOIN specializations
                 ON doctor_specialization.specialization_id = specializations.id
                 WHERE specializations.id = $1`;
    if (!value) {
      const { rows } = await this.pool.query(sql, [specializationID]);
      await this.cacheManager.set(
        `doctor/specialization/${specializationID}`,
        rows,
        {
          ttl: 3600,
        },
      );
      value = rows;
    }
    return value.map((doctor) => {
      if (!doctor) {
        return this.doctorMapper.toEntity({
          id: null,
          name: null,
          mail: null,
          specialization: null,
          user_id: null,
        });
      }
      return this.doctorMapper.toEntity(doctor);
    });
  }
}
