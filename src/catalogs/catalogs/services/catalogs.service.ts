/**
 * @fileoverview The CatalogsService class in TypeScript is an Injectable service that retrieves static catalog data
from various Prisma services. */
import { Injectable } from '@nestjs/common';

import { ModulesPrismaService } from '@/catalogs/modules';
import { PermissionsPrismaService } from '@/catalogs/permissions';
import { RolesPrismaService } from '@/catalogs/roles';
import { SectionsPrismaService } from '@/catalogs/sections';
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
    private readonly sectionsPrismaService: SectionsPrismaService,
  ) {}

  /**
   * The function `staticCatalog` asynchronously fetches data from multiple Prisma services and returns
   * a response with the fetched data.
   * @returns The `staticCatalog` method is returning a base response object that contains data from
   * various catalog methods. The data includes modules, permissions, roles, states, typeTest, and
   * typesModule. If an error occurs during the execution of any of the catalog methods, the method will
   * catch the error and return an exception handler response.
   */
  async staticCatalog() {
    try {
      const modules = await this.modulesPrismaService.catalog();
      const permissions = await this.permissionsPrismaService.catalog();
      const roles = await this.rolesPrismaService.catalog();
      const states = await this.statesPrismaService.catalog();
      const typeTest = await this.typeTestPrismasService.catalog();
      const typesModule = await this.typesModulePrismaService.catalog();
      const sections = await this.sectionsPrismaService.catalog();

      return baseResponse({
        data: {
          modules,
          permissions,
          roles,
          sections,
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
