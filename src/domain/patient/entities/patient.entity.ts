import { v1 as uuidv1 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';

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
