import { Injectable } from '@nestjs/common';

import { ICatalogsAttributes, mappingCatalogs, PrismaService } from '@/config';

import { TPermissionsNotPropControls } from '../interfaces';

@Injectable()
export class PermissionsPrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog(): Promise<ICatalogsAttributes[]> {
    const permissions = await this.prismaService.permissions.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingPermissions = mappingCatalogs<TPermissionsNotPropControls>({
      data: permissions,
    });

    return mappingPermissions;
  }
}
