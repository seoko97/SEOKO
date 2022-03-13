import { Connection } from 'mongoose';
import { UserSchema } from '@src/users/user.model';

export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema, 'User'),
    inject: ['DATABASE_CONNECTION'],
  },
];
