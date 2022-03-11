import mongoose from 'mongoose';

const DATABASE_NAME = 'seoko_server';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(`mongodb://localhost/${DATABASE_NAME}`),
  },
];
