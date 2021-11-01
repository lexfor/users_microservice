import { Controller, Get, Param } from '@nestjs/common';
import { GetAllSpecializations } from './actions/getAllSpecializations';
import { GetDoctorsBySpecializations } from './actions/getDoctorsBySpecializations';
import { SpecializationEntity } from './entities/specialization.entity';
import { DoctorEntity } from './entities/doctor.entity';

@Controller('api/doctor')
export class DoctorController {
  constructor(
    private readonly getAllSpecializationsClass: GetAllSpecializations,
    private readonly getDoctorsBySpecializationsClass: GetDoctorsBySpecializations,
  ) {}

  @Get('all/specializations')
  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return await this.getAllSpecializationsClass.getAllSpecializations();
  }

  @Get('specialization/:id')
  async getDoctorsBySpecialization(
    @Param('id') id: string,
  ): Promise<DoctorEntity[]> {
    return await this.getDoctorsBySpecializationsClass.getDoctorsBySpecializations(
      id,
    );
  }
}
