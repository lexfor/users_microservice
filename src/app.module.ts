import { Module } from '@nestjs/common';
import { UserModule } from './domain/user/user.module';
import { PatientModule } from './domain/patient/patient.module';
import { DoctorModule } from './domain/doctor/doctor.module';
import { GrpcController } from './grpc.controller';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './infrastructure/healthcheck/health.controller';
import { DatabaseHealthIndicator } from './infrastructure/healthcheck/database.health';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from './infrastructure/config';
import { poolFactory } from './infrastructure/configs/database.config';

@Module({
  imports: [
    UserModule,
    PatientModule,
    DoctorModule,
    TerminusModule,
    ConfigModule.forRoot({
      load: [config],
    }),
  ],
  controllers: [GrpcController, HealthController],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: poolFactory,
    },
    DatabaseHealthIndicator,
  ],
})
export class AppModule {}
