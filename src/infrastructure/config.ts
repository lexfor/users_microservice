import { getParameter } from './getParameter';

export default async () => ({
  SECRET_KEY: await getParameter('SECRET_KEY'),
  DATABASE_URL: await getParameter('DATABASE_URL'),
  SALT: await getParameter('SALT'),
  USERS_MICROSERVICE_GRPC: await getParameter('USERS_MICROSERVICE_GRPC'),
  GRPC_URL: await getParameter('GRPC_URL'),
});
