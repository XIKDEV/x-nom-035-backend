import { Injectable } from '@nestjs/common';

import { ICatalogsAttributes, mappingCatalogs, PrismaService } from '@/config';

import { TTypesModuleCatalog } from '../interfaces';

@Injectable()
export class TypesModulePrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog(): Promise<ICatalogsAttributes[]> {
    const moduleTypes = await this.prismaService.moduleTypes.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingPermissions = mappingCatalogs<TTypesModuleCatalog>({
      data: moduleTypes,
    });

    return mappingPermissions;
  }
}
