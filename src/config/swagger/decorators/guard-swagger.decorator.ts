import { Controller, UseGuards } from '@nestjs/common';
import { applyDecorators } from '@nestjs/common/decorators/core/apply-decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/providers/auth/guards';

import { ITagSwagger } from '../interface';

export const GuardSwagger = ({ hadSecurity = true, tag = '' }: ITagSwagger) => {
  const decorators = [Controller(tag), ApiTags(tag)];

  if (hadSecurity) {
    decorators.push(ApiBearerAuth());
    decorators.push(UseGuards(JwtAuthGuard));
  }

  return applyDecorators(...decorators);
};
