import { applyDecorators, Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '@/providers';

import { ITagSwagger } from '../interface';

export const GuardSwagger = ({ hadSecurity = true, tag = '' }: ITagSwagger) => {
  return applyDecorators(
    Controller(tag),
    ApiTags(tag),
    ApiBearerAuth(),
    hadSecurity && UseGuards(JwtAuthGuard),
  );
};
