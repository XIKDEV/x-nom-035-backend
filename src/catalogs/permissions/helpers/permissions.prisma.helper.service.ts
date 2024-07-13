import { Injectable } from '@nestjs/common';

import { ICatalogsAttributes, mappingCatalogs, PrismaService } from '@/config';

import { TPermissionsNotPropControls } from '../interfaces';

@Injectable()
export class PermissionsService {
  constructor(private prismaService: PrismaService) {}

  async catalog(): Promise<ICatalogsAttributes[]> {
    const modules = await this.prismaService.modules.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingModules = mappingCatalogs<TPermissionsNotPropControls>({
      data: modules,
    });

    return mappingModules;
  }
}
