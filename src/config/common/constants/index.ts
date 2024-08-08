import {
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { IErrorNoStatus } from '../interfaces';

export const nodeEnv = {
  development: 'development',
  production: 'production',
  qas: 'qas',
};

export const httpExceptionFilter = {
  401: (error: IErrorNoStatus) => {
    throw new UnauthorizedException(error.message);
  },
  403: (error: IErrorNoStatus) => {
    throw new ForbiddenException(error.message);
  },
  500: (error: IErrorNoStatus) => {
    throw new InternalServerErrorException(
      `${error.name}: ${error.message ?? error.code}`,
    );
  },
  409: (error: IErrorNoStatus) => {
    throw new ConflictException(error.message);
  },
  422: (error: IErrorNoStatus) => {
    throw new UnprocessableEntityException(error.message);
  },
};

export const regularExpressionsLocals = {
  rfcEnterprise: /^[A-Z]{3}\d{6}[A-Z0-9]{3}$/,
};
