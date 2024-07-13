import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { PermissionsService } from './helpers';

@Module({
  providers: [PermissionsService],
  imports: [PrismaModule],
})
export class PermissionsModule {}
