import { v1 as uuidv1 } from 'uuid';
import { Injectable } from '@nestjs/common';

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
    id = uuidv1(),
  ) {
    this.id = id;
    this.userID = userID;
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
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
