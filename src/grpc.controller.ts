import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetPatientByID } from './patient/commands/getPatientByID';
import { PatientEntity } from './patient/entities/patient.entity';
import { GetDoctorByUserID } from './doctor/commands/getDoctorByUserID';
import { DoctorEntity } from './doctor/entities/doctor.entity';

@Controller()
export class GrpcController {
  constructor(
    private readonly getPatientByIDClass: GetPatientByID,
    private readonly getDoctorByUserIDClass: GetDoctorByUserID,
  ) {}

  @GrpcMethod()
  async getPatientByID(patientID: string): Promise<PatientEntity> {
    return await this.getPatientByIDClass.getPatientByID(patientID);
  }

  @GrpcMethod()
  async getDoctorByUserID(userID: string): Promise<DoctorEntity> {
    return await this.getDoctorByUserIDClass.getDoctorByUserID(userID);
  }
}
