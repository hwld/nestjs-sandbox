import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { ValidatedUser } from 'src/types';

export const ValidUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ValidatedUser => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
