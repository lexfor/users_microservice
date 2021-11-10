import { v1 as uuidv1 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class DoctorEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly name: string;
  @ApiProperty()
  private readonly specialization: string;
  @ApiProperty()
  private readonly mail: string;
  @ApiProperty()
  private readonly userID: string;

  constructor(
    userID: string,
    name: string,
    specialization: string,
    mail: string,
    id = uuidv1(),
  ) {
    this.id = id;
    this.userID = userID;
    this.name = name;
    this.specialization = specialization;
    this.mail = mail;
  }

  get getID(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }

  get getSpecialization(): string {
    return this.specialization;
  }

  get getMail(): string {
    return this.mail;
  }

  get getUserID(): string {
    return this.userID;
  }
}
