import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PatientModule } from './patient/patient.module';
import { DoctorModule } from './doctor/doctor.module';
import { GrpcController } from './grpc.controller';

@Module({
  imports: [UserModule, PatientModule, DoctorModule],
  controllers: [GrpcController],
})
export class AppModule {}
