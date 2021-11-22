import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { IPatientRepository } from './interfaces/repository.interface';
import { IPatient } from './interfaces/patient.interface';
import { PatientEntity } from './entities/patient.entity';
import { PatientMapper } from './mapper/patient.mapper';
import { Cache } from 'cache-manager';
import { delay, end, start } from '../../infrastructure/timer';

@Injectable()
export class PatientRepository implements IPatientRepository {
  constructor(
    @Inject('DATABASE_POOL') private pool,
    private readonly mapper: PatientMapper,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createPatient(patientEntity: PatientEntity): Promise<PatientEntity> {
    start();
    const patient: IPatient = this.mapper.toRow(patientEntity);
    const sql = `INSERT INTO patients 
                 (id, name, birthday, gender, mail, user_id) VALUES
                 ($1, $2, $3, $4, $5, $6);`;
    await this.pool.query(sql, [
      patient.id,
      patient.name,
      patient.birthday,
      patient.gender,
      patient.mail,
      patient.user_id,
    ]);
    end();
    console.debug(delay());
    return patientEntity;
  }

  async findPatientByUserID(userID: string): Promise<PatientEntity> {
    start();
    let value: IPatient = await this.cacheManager.get(`patient/${userID}`);

    const sql = `SELECT * FROM patients WHERE user_id = $1`;

    if (!value) {
      const { rows } = await this.pool.query(sql, [userID]);
      const [result] = rows;
      await this.cacheManager.set(`patient/${userID}`, result, {
        ttl: 3600,
      });
      value = result;
    }
    end();
    console.debug(delay());
    if (!value) {
      return this.mapper.toEntity({
        id: null,
        name: null,
        mail: null,
        birthday: null,
        gender: null,
        user_id: null,
      });
    }
    return this.mapper.toEntity(value);
  }

  async getAllPatients(patientInfo: string): Promise<PatientEntity[]> {
    start();
    const sql = `SELECT * FROM patients
                 WHERE name LIKE '%${patientInfo}%'
                 OR mail LIKE '%${patientInfo}%'`;
    const { rows } = await this.pool.query(sql);
    end();
    console.debug(delay());
    return rows.map((row) => {
      return this.mapper.toEntity(row);
    });
  }

  async getPatientByID(patientID: string): Promise<PatientEntity> {
    start();
    let value: IPatient = await this.cacheManager.get(`patient/${patientID}`);

    const sql = `SELECT * FROM patients WHERE id = $1`;

    if (!value) {
      const { rows } = await this.pool.query(sql, [patientID]);
      const [result] = rows;
      await this.cacheManager.set(`patient/${patientID}`, result, {
        ttl: 3600,
      });
      value = result;
    }
    end();
    console.debug(delay());
    if (!value) {
      return this.mapper.toEntity({
        id: null,
        name: null,
        mail: null,
        birthday: null,
        gender: null,
        user_id: null,
      });
    }
    return this.mapper.toEntity(value);
  }
}
