import { v1 as uuidv1 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { CreatePatientDto } from '../dto/create-patient.dto';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class PatientEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly name: string;
  @ApiProperty()
  private readonly birthday: string;
  @ApiProperty()
  private readonly gender: string;
  @ApiProperty()
  private readonly mail: string;
  @ApiProperty()
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

  static create(createPatientDto: CreatePatientDto): PatientEntity {
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
