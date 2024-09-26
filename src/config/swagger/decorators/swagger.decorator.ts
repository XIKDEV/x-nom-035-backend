import { Delete, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import {
  ApiBearerAuth,
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
import { JwtAuthGuard } from '@/providers/auth/guards';

import { GenericResponse, GenericResponseError } from '../dto';
import {
  IMethodsDecoratorSwagger,
  ISwaggerResponseOptions,
} from '../interface';
import { ModulesSecurity } from '@/providers/auth/decorators';

export const Swagger = ({
  status,
  restApi,
  link = '',
  apiConsumes = constantsApiConsumes.json,
  hadSecurity = false,
  idModule,
}: ISwaggerResponseOptions) => {
  const restOptions: IMethodsDecoratorSwagger = {
    Get,
    Post,
    Patch,
    Delete,
  };

  const decorators = [
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
  ];

  if (hadSecurity) {
    decorators.push(ApiBearerAuth());
    decorators.push(UseGuards(JwtAuthGuard));
  }

  if (idModule) {
    decorators.push(ModulesSecurity(idModule));
  }
  return applyDecorators(...decorators);
};
