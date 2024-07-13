import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { RolesPrismaService } from './helpers';

@Module({
  providers: [RolesPrismaService],
  imports: [PrismaModule],
})
export class RolesModule {}
