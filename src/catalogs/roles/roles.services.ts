import { baseResponse, handlerException, PrismaService } from '@/config';
import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-roles.dto';
import { RolesPrismaService } from './helpers';

@Injectable()
export class RolesService {
  constructor(private readonly rolesPrismaService: RolesPrismaService) {}

  async create({ name, descripction, active }: CreateRoleDto) {
    try {
      await this.rolesPrismaService.validateDuplicate(name);

      const data = await this.rolesPrismaService.create({
        name,
        descripction,
        active,
      });
      return baseResponse({ data });
    } catch (error) {
      return handlerException(error);
    }
  }
}
