import { getParameter } from './getParameter';

export default async () => ({
  SECRET_KEY: await getParameter('SECRET_KEY'),
  DATABASE_URL: await getParameter('DATABASE_URL'),
  SALT: await getParameter('SALT'),
});
