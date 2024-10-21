import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { RolesController } from './controllers';
import { RolesPrismaService } from './helpers';
import { RolesService } from './services/roles.services';

@Module({
  providers: [RolesPrismaService, RolesService],
  controllers: [RolesController],
  exports: [RolesPrismaService],
  imports: [PrismaModule],
})
export class RolesModule {}
