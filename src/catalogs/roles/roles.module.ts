import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { RolesPrismaService } from './helpers';
import { RolesController } from './controllers';
import { AuthModule } from '@/providers';
import { RolesService } from './services/roles.services';

@Module({
  providers: [RolesPrismaService, RolesService],
  controllers: [RolesController],
  exports: [RolesPrismaService],
  imports: [PrismaModule, AuthModule],
})
export class RolesModule {}
