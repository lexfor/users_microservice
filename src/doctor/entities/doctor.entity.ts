import { v1 as uuidv1 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { IDoctor } from '../interfaces/doctor.interface';

@Injectable()
export class DoctorEntity {
  private readonly id: string;
  private readonly firstName: string;
  private readonly lastName: string;
  private readonly mail: string;
  private readonly userID: string;

  constructor(
    userID: string,
    firstName: string,
    lastName: string,
    mail: string,
    private readonly config: ConfigService,
    id = uuidv1(),
  ) {
    this.id = id;
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
  }

  copy(doctor: IDoctor): DoctorEntity {
    return new DoctorEntity(
      doctor.user_id,
      doctor.first_name,
      doctor.last_name,
      doctor.mail,
      this.config,
      doctor.id,
    );
  }

  get getID(): string {
    return this.id;
  }

  get getFirstName(): string {
    return this.firstName;
  }

  get getLastName(): string {
    return this.lastName;
  }

  get getMail(): string {
    return this.mail;
  }

  get getUserID(): string {
    return this.userID;
  }
}
