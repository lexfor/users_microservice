import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'http://localhost:8080',
    package: 'lab',
    protoPath: join(__dirname, '../grpc/grpc.proto'),
  },
};
