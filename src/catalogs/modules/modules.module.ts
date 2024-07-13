import { Module } from '@nestjs/common';

import { ModulesPrismaService } from './helpers/modules.prisma.helper.service';

@Module({
  providers: [ModulesPrismaService],
})
export class ModulesModule {}
