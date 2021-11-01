import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { PatientModule } from './domain/patient/patient.module';
import { DoctorModule } from './domain/doctor/doctor.module';
import { GrpcController } from './grpc.controller';

@Module({
  imports: [UserModule, PatientModule, DoctorModule],
  controllers: [GrpcController],
})
export class AppModule {}
