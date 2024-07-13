import { Injectable } from '@nestjs/common';

import { mappingCatalogs, PrismaService } from '@/config';

import { TModulesNotPropControls } from '../interfaces';

@Injectable()
export class ModulesPrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog() {
    const modules = await this.prismaService.modules.findMany({
      select: {
        id: true,
        name: true,
        component: true,
        description: true,
        icon: true,
        route: true,
        idType: true,
        menuOption: true,
      },
    });

    const mappingModules = mappingCatalogs<TModulesNotPropControls>({
      data: modules,
    });

    return mappingModules;
  }
}
