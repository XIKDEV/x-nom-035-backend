import { Injectable } from '@nestjs/common';

import { baseResponse, handlerException } from '@/config';

import { CreateRoleDto } from '../dto';
import { RolesPrismaService } from '../helpers';

@Injectable()
export class RolesService {
  constructor(private readonly rolesPrismaService: RolesPrismaService) {}

  async create({ name, description }: CreateRoleDto) {
    try {
      await this.rolesPrismaService.validateDuplicate(name);

      await this.rolesPrismaService.create({
        name,
        description,
      });
      return baseResponse({});
    } catch (error) {
      return handlerException(error);
    }
  }
}
