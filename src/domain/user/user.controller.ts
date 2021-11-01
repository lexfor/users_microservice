import {
  Body,
  Controller,
  DefaultValuePipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { IUser } from './interfaces/user.interface';
import { CreateUser } from './actions/createUser';
import { LoginUserDto } from './dto/login-user.dto';
import { GetUser } from './actions/getUser';
import { roles } from '../../infrastructure/constants';
import { UserEntity } from './entities/user.entity';
import { CreatePatientDto } from '../patient/dto/create-patient.dto';
import { CreatePatient } from '../patient/actions/createPatient';
import { PatientEntity } from '../patient/entities/patient.entity';
import { FindPatientByUserID } from '../patient/actions/findPatientByUserID';

@Controller('api/user')
export class UserController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly getUser: GetUser,
    private readonly createPatient: CreatePatient,
    private readonly findPatientByUserID: FindPatientByUserID,
  ) {}

  @Post('register')
  async registerUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<PatientEntity> {
    const user: UserEntity = await this.createUser.createUser(createUserDto);
    const createPatientDto: CreatePatientDto = {
      user_id: user.getID,
      name: createUserDto.name,
      birthday: createUserDto.birthday,
      gender: createUserDto.gender,
      mail: createUserDto.login,
    };
    return await this.createPatient.createPatient(createPatientDto);
  }

  @Post('login')
  async getUserByLogin(
    @Body(ValidationPipe) loginUserDto: LoginUserDto,
    @Query('role', new DefaultValuePipe(roles.patient)) role: string,
  ): Promise<PatientEntity> {
    const user: UserEntity = await this.getUser.getUser(loginUserDto, role);
    return await this.findPatientByUserID.findPatientByUserID(user.getID);
  }
}
