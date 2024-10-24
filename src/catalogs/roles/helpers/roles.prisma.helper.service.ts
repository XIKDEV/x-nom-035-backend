import { ConflictException, Injectable } from '@nestjs/common';

import { ICatalogsAttributes, mappingCatalogs, PrismaService } from '@/config';

import { UpdateRoleDto } from '../dto';
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

  async findByIdRol(id: number) {
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

  async validateDuplicateRol(name: string): Promise<void> {
    const roles = await this.prismaService.roles.findFirst({
      where: {
        name,
      },
    });
    if (roles) {
      throw new ConflictException(roleMessages.roleDuplicate);
    }
  }

  async createRol(data: CreateRoleDto) {
    const role = await this.prismaService.roles.create({ data });
    return { role };
  }

  async findAllRol() {
    const role = await this.prismaService.roles.findMany();
    return { role };
  }

  async updateRol(data: UpdateRoleDto) {
    const role = await this.prismaService.roles.update({
      where: {
        id: data.id,
      },
      data: {
        ...data,
      },
    });
    return { role };
  }

  async deleteRol(id: number) {
    return await this.prismaService.roles.delete({
      where: {
        id,
      },
    });
  }
}
