import { Controller, Get, Query } from '@nestjs/common';
import { GetAllPatients } from './commands/getAllPatients';
import { PatientEntity } from './entities/patient.entity';

@Controller('patient')
export class PatientController {
  constructor(private readonly getAllPatients: GetAllPatients) {}

  @Get('all')
  async findPatient(
    @Query('patientInfo') patientInfo: string,
  ): Promise<PatientEntity[]> {
    return await this.getAllPatients.getAllPatients(patientInfo);
  }
}
