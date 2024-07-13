import { Module } from '@nestjs/common';

import { PrismaModule } from '@/config';

import { ModulesPrismaService } from './helpers/modules.prisma.helper.service';

@Module({
  providers: [ModulesPrismaService],
  imports: [PrismaModule],
})
export class ModulesModule {}
