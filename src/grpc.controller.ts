import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GetPatientByID } from './domain/patient/actions/getPatientByID';
import { GetDoctorByUserID } from './domain/doctor/actions/getDoctorByUserID';
import { CreateUser } from './domain/user/actions/createUser';
import { GetUser } from './domain/user/actions/getUser';
import { CreateUserDto } from './domain/user/dto/create-user.dto';
import { IGetUserMessage } from './domain/user/interfaces/get-user-message.interface';
import { IUser } from './domain/user/interfaces/user.interface';
import { UserMapper } from './domain/user/mapper/user.mapper';
import { PatientMapper } from './domain/patient/mapper/patient.mapper';
import { DoctorMapper } from './domain/doctor/mapper/doctor.mapper';
import { CreatePatient } from './domain/patient/actions/createPatient';
import { IPatient } from './domain/patient/interfaces/patient.interface';
import { FindPatientByUserID } from './domain/patient/actions/findPatientByUserID';
import { IDoctor } from './domain/doctor/interfaces/doctor.interface';
import { ICreatePatientMessage } from './domain/patient/interfaces/create-patient-message.interface';
import { CreatePatientDto } from './domain/patient/dto/create-patient.dto';
import { IPatientMessage } from './domain/patient/interfaces/patient-message.interface';
import { IDoctorMessage } from './domain/doctor/interfaces/doctor-message.interface';
import { IUserIDMessage } from './domain/user/interfaces/userID-message.interface';

@Controller()
export class GrpcController {
  constructor(
    private readonly usersMapper: UserMapper,
    private readonly patientMapper: PatientMapper,
    private readonly doctorMapper: DoctorMapper,
    private readonly createPatientClass: CreatePatient,
    private readonly findPatientByUserIDClass: FindPatientByUserID,
    private readonly getPatientByIDClass: GetPatientByID,
    private readonly createUserClass: CreateUser,
    private readonly getUserClass: GetUser,
    private readonly getDoctorByUserIDClass: GetDoctorByUserID,
  ) {}

  @GrpcMethod('UsersService', 'CreateUser')
  async createUser(data: CreateUserDto): Promise<IUser> {
    return this.usersMapper.toRow(await this.createUserClass.createUser(data));
  }

  @GrpcMethod('UsersService', 'GetUser')
  async getUser(data: IGetUserMessage): Promise<IUser> {
    return this.usersMapper.toRow(
      await this.getUserClass.getUser(
        {
          login: data.login,
          password: data.password,
        },
        data.role,
      ),
    );
  }

  @GrpcMethod('PatientService', 'CreatePatient')
  async createPatient(data: ICreatePatientMessage): Promise<IPatientMessage> {
    const createPatientDto: CreatePatientDto = {
      ...data,
      user_id: data.userID,
    };
    const patient: IPatient = this.patientMapper.toRow(
      await this.createPatientClass.createPatient(createPatientDto),
    );
    return {
      id: patient.id,
      name: patient.name,
      mail: patient.mail,
      birthday: patient.birthday,
      gender: patient.gender,
      userID: patient.user_id,
    };
  }

  @GrpcMethod('PatientService', 'GetPatientByUserID')
  async getPatientByUserID(data: IUserIDMessage): Promise<IPatientMessage> {
    const patient: IPatient = this.patientMapper.toRow(
      await this.findPatientByUserIDClass.findPatientByUserID(data.userID),
    );
    return {
      id: patient.id,
      name: patient.name,
      mail: patient.mail,
      birthday: patient.birthday,
      gender: patient.gender,
      userID: patient.user_id,
    };
  }

  @GrpcMethod('PatientService', 'GetPatientByID')
  async getPatientByID(data: IUserIDMessage): Promise<IPatientMessage> {
    const patient: IPatient = this.patientMapper.toRow(
      await this.getPatientByIDClass.getPatientByID(data.userID),
    );
    return {
      id: patient.id,
      name: patient.name,
      mail: patient.mail,
      birthday: patient.birthday,
      gender: patient.gender,
      userID: patient.user_id,
    };
  }

  @GrpcMethod('DoctorService', 'GetDoctorByUserID')
  async getDoctorByUserID(data: IUserIDMessage): Promise<IDoctorMessage> {
    const doctor: IDoctor = this.doctorMapper.toRow(
      await this.getDoctorByUserIDClass.getDoctorByUserID(data.userID),
    );
    return {
      id: doctor.id,
      name: doctor.name,
      mail: doctor.mail,
      specialization: doctor.specialization,
      userID: doctor.user_id,
    };
  }
}
