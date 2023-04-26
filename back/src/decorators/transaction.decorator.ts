import { InternalServerErrorException } from '@nestjs/common';

import { ALS } from '@utils/AsyncLocalStorage';
import { ConnectionStore } from '@utils/ConnectionStore';
import { TRANSACTION_SESSION } from '@utils/constants';

export function Transactional(): MethodDecorator {
  return (
    target: any,
    propertyKey: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ) => {
    const originalMethod = descriptor.value;
    const als = new ALS();

    descriptor.value = async function (...args: any[]) {
      return als.run(async () => {
        const connection = new ConnectionStore().getConnection();

        if (!connection) {
          throw new InternalServerErrorException("Can't find connection");
        }

        const session = await connection.startSession();
        als.set(TRANSACTION_SESSION, session);

        try {
          let result: any;

          await session.withTransaction(async () => {
            result = await originalMethod.apply(this, args);
          });

          return result;
        } catch (error) {
          throw error;
        } finally {
          session.endSession();
        }
      });
    };
    return descriptor;
  };
}
