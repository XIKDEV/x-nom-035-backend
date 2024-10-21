import { Module } from '@nestjs/common';

import { ModulesModule } from '../modules';
import { PermissionsModule } from '../permissions';
import { RolesModule } from '../roles';
import { SectionsModule } from '../sections';
import { StatesModule } from '../states';
import { TypeTestModule } from '../type-test';
import { TypesModuleModule } from '../types-module';
import { CatalogsController } from './controllers';
import { CatalogsService } from './services';

@Module({
  controllers: [CatalogsController],
  providers: [CatalogsService],
  imports: [
    ModulesModule,
    PermissionsModule,
    RolesModule,
    StatesModule,
    TypeTestModule,
    TypesModuleModule,
    SectionsModule,
  ],
})
export class CatalogsModule {}
