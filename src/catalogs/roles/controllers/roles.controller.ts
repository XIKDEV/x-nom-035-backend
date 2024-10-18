import { apiMethods, EModules, Swagger } from '@/config';
import { GuardSwagger } from '@/config/swagger/decorators/guard-swagger.decorator';
import { RolesService } from '../services/roles.services';
import { CreateRoleDto } from '../dto/create-roles.dto';
import { Body } from '@nestjs/common';

@GuardSwagger({
  tag: 'roles',
})
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Swagger({
    restApi: apiMethods.post,
    idModule: EModules.ROLE,
  })
  create(@Body() CreateRoleDto: CreateRoleDto) {
    return this.rolesService.create(CreateRoleDto);
  }
}
