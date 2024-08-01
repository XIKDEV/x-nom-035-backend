import { Injectable } from '@nestjs/common';

import { ModulesPrismaService } from '@/catalogs/modules';
import { PermissionsPrismaService } from '@/catalogs/permissions';
import { RolesPrismaService } from '@/catalogs/roles';
import { StatesPrismaService } from '@/catalogs/states';
import { TypeTestPrismaService } from '@/catalogs/type-test';
import { TypesModulePrismaService } from '@/catalogs/types-module';
import { baseResponse, handlerException } from '@/config';

@Injectable()
export class CatalogsService {
  constructor(
    private readonly modulesPrismaService: ModulesPrismaService,
    private readonly permissionsPrismaService: PermissionsPrismaService,
    private readonly rolesPrismaService: RolesPrismaService,
    private readonly statesPrismaService: StatesPrismaService,
    private readonly typeTestPrismasService: TypeTestPrismaService,
    private readonly typesModulePrismaService: TypesModulePrismaService,
  ) {}

  async staticCatalog() {
    try {
      const modules = await this.modulesPrismaService.catalog();
      const permissions = await this.permissionsPrismaService.catalog();
      const roles = await this.rolesPrismaService.catalog();
      const states = await this.statesPrismaService.catalog();
      const typeTest = await this.typeTestPrismasService.catalog();
      const typesModule = await this.typesModulePrismaService.catalog();

      return baseResponse({
        data: {
          modules,
          permissions,
          roles,
          states,
          typeTest,
          typesModule,
        },
      });
    } catch (error) {
      return handlerException(error);
    }
  }
}
