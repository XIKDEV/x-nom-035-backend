import { Injectable } from '@nestjs/common';

import { ICatalogsAttributes, mappingCatalogs, PrismaService } from '@/config';

import { TRolesNotPropControls } from '../interfaces';

@Injectable()
export class RolesPrismaService {
  constructor(private prismaService: PrismaService) {}

  async catalog(): Promise<ICatalogsAttributes[]> {
    const roles = await this.prismaService.roles.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    const mappingRoles = mappingCatalogs<TRolesNotPropControls>({
      data: roles,
    });

    return mappingRoles;
  }
}
