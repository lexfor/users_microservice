import { SpecializationEntity } from '../entities/specialization.entity';
import { ISpecialization } from '../interfaces/specialization.interface';

export class SpecializationMapper {
  toEntity(specialization: ISpecialization): SpecializationEntity {
    return new SpecializationEntity(specialization.name, specialization.id);
  }

  toRow(specializationEntity: SpecializationEntity): ISpecialization {
    return {
      id: specializationEntity.getID,
      name: specializationEntity.getName,
    };
  }
}
