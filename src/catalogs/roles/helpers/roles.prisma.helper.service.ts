import { ConflictException, Injectable } from '@nestjs/common';

import { ICatalogsAttributes, mappingCatalogs, PrismaService } from '@/config';

import { CreateRoleDto } from '../dto/create-roles.dto';
import { TRolesNotPropControls } from '../interfaces';
import { roleMessages } from '../messages';

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

  async findById(id: number) {
    const role = await this.prismaService.roles.findUnique({
      where: {
        id,
      },
    });

    if (!role) {
      throw new ConflictException(roleMessages.roleNotFound);
    }

    return role;
  }

  async validateDuplicate(name: string): Promise<void> {
    const roles = await this.prismaService.roles.findFirst({
      where: {
        name,
      },
    });
    if (roles) {
      throw new ConflictException(roleMessages.roleDuplicate);
    }
  }

  async create(data: CreateRoleDto) {
    const role = await this.prismaService.roles.create({ data });
    return { role };
  }
}
