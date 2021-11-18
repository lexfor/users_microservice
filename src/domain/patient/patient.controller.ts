import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { GetAllPatients } from './actions/getAllPatients';
import { PatientEntity } from './entities/patient.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Patients')
@Controller('patient')
export class PatientController {
  constructor(private readonly getAllPatients: GetAllPatients) {}

  @Get('all')
  @ApiOkResponse({
    description: 'all founded patients',
    type: PatientEntity,
    isArray: true,
  })
  async findPatient(
    @Query('patientInfo') patientInfo: string,
  ): Promise<PatientEntity[]> {
    const patients: PatientEntity[] = await this.getAllPatients.getAllPatients(
      patientInfo,
    );
    const notNullPatients: PatientEntity[] = patients.filter(
      (patient) => patient.getID !== null,
    );
    if (notNullPatients.length === 0) {
      throw new HttpException('no patients found', HttpStatus.NOT_FOUND);
    }
    return notNullPatients;
  }
}
