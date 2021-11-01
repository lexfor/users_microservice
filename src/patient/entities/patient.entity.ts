import { v1 as uuidv1 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { IPatient } from '../interfaces/patient.interface';

@Injectable()
export class PatientEntity {
  private readonly id: string;
  private readonly name: string;
  private readonly birthday: string;
  private readonly gender: string;
  private readonly mail: string;
  private readonly userID: string;

  constructor(
    userID: string,
    name: string,
    birthday: string,
    gender: string,
    mail: string,
    private readonly config: ConfigService,
    id = uuidv1(),
  ) {
    this.id = id;
    this.userID = userID;
    this.name = name;
    this.birthday = birthday;
    this.gender = gender;
    this.mail = mail;
  }

  create(createPatientDto: CreatePatientDto): PatientEntity {
    return new PatientEntity(
      createPatientDto.user_id,
      createPatientDto.name,
      createPatientDto.birthday,
      createPatientDto.gender,
      createPatientDto.mail,
      this.config,
    );
  }

  copy(patient: IPatient): PatientEntity {
    return new PatientEntity(
      patient.user_id,
      patient.name,
      patient.birthday,
      patient.gender,
      patient.mail,
      this.config,
      patient.id,
    );
  }

  get getID(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getBirthday(): string {
    return this.birthday;
  }

  get getGender(): string {
    return this.gender;
  }

  get getMail(): string {
    return this.mail;
  }

  get getUserID(): string {
    return this.userID;
  }
}
