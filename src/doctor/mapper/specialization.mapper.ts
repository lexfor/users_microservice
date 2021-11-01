import { SpecializationEntity } from '../entities/specialization.entity';
import { ISpecialization } from '../interfaces/specialization.interface';

export class SpecializationMapper {
  constructor(private readonly entity: SpecializationEntity) {}

  toEntity(specialization: ISpecialization): SpecializationEntity {
    return this.entity.copy(specialization);
  }

  toRow(specializationEntity: SpecializationEntity): ISpecialization {
    return {
      id: specializationEntity.getID,
      name: specializationEntity.getName,
    };
  }
}
