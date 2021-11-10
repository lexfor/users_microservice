import { v1 as uuidv1 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

@Injectable()
export class SpecializationEntity {
  @ApiProperty()
  private readonly id: string;
  @ApiProperty()
  private readonly name: string;

  constructor(name: string, id = uuidv1()) {
    this.id = id;
    this.name = name;
  }

  get getID(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }
}
