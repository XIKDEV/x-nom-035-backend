import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    console.log(data);
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
