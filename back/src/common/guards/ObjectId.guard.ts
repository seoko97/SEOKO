import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Types } from 'mongoose';

@Injectable()
export class ObjectIdGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const $lastId = ctx.getArgs().input?.lastId;

    if ($lastId && !Types.ObjectId.isValid($lastId)) return false;

    return true;
  }
}
