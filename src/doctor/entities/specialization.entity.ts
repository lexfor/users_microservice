import { v1 as uuidv1 } from 'uuid';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { ISpecialization } from '../interfaces/specialization.interface';

@Injectable()
export class SpecializationEntity {
  private readonly id: string;
  private readonly name: string;

  constructor(
    name: string,
    private readonly config: ConfigService,
    id = uuidv1(),
  ) {
    this.id = id;
    this.name = name;
  }

  copy(specialization: ISpecialization): SpecializationEntity {
    return new SpecializationEntity(
      specialization.name,
      this.config,
      specialization.id,
    );
  }

  get getID(): string {
    return this.id;
  }

  get getName(): string {
    return this.name;
  }
}
