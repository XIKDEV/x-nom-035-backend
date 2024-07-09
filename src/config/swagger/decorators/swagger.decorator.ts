import { applyDecorators, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiConsumes,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import {
  apiConsumes as constantsApiConsumes,
  apiMessages,
  statusCodes,
} from '@/config/api';

import { GenericResponse, GenericResponseError } from '../dto';
import {
  IMethodsDecoratorSwagger,
  ISwaggerResponseOptions,
} from '../interface';

export const Swagger = ({
  status,
  restApi,
  link = '',
  apiConsumes = constantsApiConsumes.json,
  hadSecurity: _ = false,
}: ISwaggerResponseOptions) => {
  const restOptions: IMethodsDecoratorSwagger = {
    Get,
    Post,
    Patch,
    Delete,
  };

  return applyDecorators(
    ApiResponse({
      status: status || statusCodes.ok,
      description:
        status === statusCodes.created
          ? apiMessages.created
          : apiMessages.success,
      type: GenericResponse,
    }),
    ApiForbiddenResponse({
      description: apiMessages.notPermission,
      type: GenericResponseError,
    }),
    ApiConflictResponse({
      description: apiMessages.conflict,
      type: GenericResponseError,
    }),
    ApiUnauthorizedResponse({
      type: GenericResponseError,
      description: apiMessages.unauthorized,
    }),
    ApiUnprocessableEntityResponse({
      type: GenericResponseError,
      description: apiMessages.unprocessableEntity,
    }),
    ApiInternalServerErrorResponse({
      type: GenericResponseError,
      description: apiMessages.internalServerError,
    }),
    ApiConsumes(apiConsumes),
    restOptions[restApi as keyof IMethodsDecoratorSwagger](link),
    // hadSecurity && UseGuards(JwtAuthGuard),
  );
};
