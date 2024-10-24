import { Injectable } from '@nestjs/common';

import { baseResponse, handlerException, IdDto } from '@/config';

import { CreateRoleDto, UpdateRoleDto } from '../dto';
import { RolesPrismaService } from '../helpers';

@Injectable()
export class RolesService {
  constructor(private readonly rolesPrismaService: RolesPrismaService) {}

  async create({ name, description }: CreateRoleDto) {
    try {
      await this.rolesPrismaService.validateDuplicateRol(name);

      await this.rolesPrismaService.createRol({
        name,
        description,
      });
      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }

  async findAllRoles() {
    try {
      const data = await this.rolesPrismaService.findAllRol();
      return baseResponse({ data });
    } catch (error) {
      handlerException(error);
    }
  }

  async updateRole({ id, name, description }: UpdateRoleDto) {
    try {
      const roleForUpdate = await this.rolesPrismaService.findByIdRol(id);
      const data = { id, name, description };
      if (roleForUpdate) {
        await this.rolesPrismaService.updateRol(data);
      }
    } catch (error) {
      handlerException(error);
    }
  }

  async deleteRole({ id }: IdDto) {
    try {
      await this.rolesPrismaService.deleteRol(id);
      return baseResponse({});
    } catch (error) {
      handlerException(error);
    }
  }
}
