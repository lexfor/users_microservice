import { v1 as uuidv1 } from 'uuid';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SpecializationEntity {
  private readonly id: string;
  private readonly name: string;

  constructor(
    name: string,
    id = uuidv1(),
  ) {
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
