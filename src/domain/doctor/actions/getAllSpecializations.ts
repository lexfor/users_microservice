import { DoctorRepository } from '../doctor.repository';
import { SpecializationEntity } from '../entities/specialization.entity';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

export class GetAllSpecializations {
  constructor(
    @Inject('DATABASE_REPOSITORY')
    private readonly repository: DoctorRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    const value: SpecializationEntity[] = await this.cacheManager.get(
      'all/specializations',
    );
    if (!value) {
      const specializations = await this.repository.getAllSpecializations();
      console.log(specializations);
      await this.cacheManager.set('all/specializations', specializations);
      console.log(await this.cacheManager.get('all/specializations'));
      return specializations;
    }
    return value;
  }
}
