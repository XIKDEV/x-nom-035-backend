import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './modules';
import { AuthModule } from './providers';
import { ModulesModule } from './catalogs/modules/modules.module';
import { PermissionsModule } from './catalogs/permissions/permissions.module';
import { RolesModule } from './catalogs/roles/roles.module';
import { TypeTestModule } from './catalogs/type-test/type-test.module';
import { TypesModuleModule } from './catalogs/types-module/types-module.module';
import { StatesModule } from './catalogs/states/states.module';
import { CatalogsModule } from './catalogs/catalogs/catalogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    RolesModule,
    ModulesModule,
    PermissionsModule,
    TypeTestModule,
    TypesModuleModule,
    StatesModule,
    CatalogsModule,
  ],
})
export class AppModule {}
