import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';
import { GetAllSpecializations } from './actions/getAllSpecializations';
import { GetDoctorsBySpecializations } from './actions/getDoctorsBySpecializations';
import { SpecializationEntity } from './entities/specialization.entity';
import { DoctorEntity } from './entities/doctor.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Doctors')
@Controller('api/doctor')
export class DoctorController {
  constructor(
    private readonly getAllSpecializationsClass: GetAllSpecializations,
    private readonly getDoctorsBySpecializationsClass: GetDoctorsBySpecializations,
  ) {}

  @ApiOkResponse({
    description: 'all available specializations',
    type: SpecializationEntity,
    isArray: true,
  })
  @Get('specializations/all')
  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    const specializations: SpecializationEntity[] =
      await this.getAllSpecializationsClass.getAllSpecializations();
    const notNullSpecializations: SpecializationEntity[] =
      specializations.filter((specialization) => specialization.getID !== null);
    if (notNullSpecializations.length === 0) {
      throw new HttpException(
        'no specializations available',
        HttpStatus.NOT_FOUND,
      );
    }
    return notNullSpecializations;
  }

  @ApiOkResponse({
    description: 'specialization name founded by id',
    type: SpecializationEntity,
  })
  @Get('specialization/:id')
  async getDoctorsBySpecialization(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DoctorEntity[]> {
    const doctors: DoctorEntity[] =
      await this.getDoctorsBySpecializationsClass.getDoctorsBySpecializations(
        id,
      );
    const notNullDoctors: DoctorEntity[] = doctors.filter(
      (doctor) => doctor.getID !== null,
    );
    if (notNullDoctors.length === 0) {
      throw new HttpException('no doctors found', HttpStatus.NOT_FOUND);
    }
    return notNullDoctors;
  }
}
